import { Component, ComponentType } from '../../types/component_type';
import { Database } from '../../types/database_type';
import { getNewId } from '../id_generator/id_generator';
import { addChild, removeChild } from '../component/component';

// Global database for the entire application.
export const database: Database = {};

// every component has common properties (e.g. parent_id, id)
// but also attributes specific to the componet itself

// object that represents type 

// { component_type: Page, title: "blah", emoji: blah }, 1
// parentId should also have that new object inserted into it

// this function is misleading because it's not realy creating a new component, it's more like "create and insert into database"
export const createComponent = (
    database: Database,
    component_type: ComponentType,
    parent_id: number,
): Database => {
    const newId = getNewId();
    const newComponent : Component = {
        id: newId,
        component_type: component_type,
        parent_id: parent_id,
        children: []
    }
    const parentComponent = getComponent(database, parent_id);
    return {
        ...database,
        [parent_id]: {
            ...parentComponent,
            children: [...parentComponent.children, newId]
        },
        [newId]: newComponent
    }
}


// Specifying id is explicit for testing.
export const createTestComponent = (
    database: Database,
    component_type: ComponentEnum,
    parent_id: number,
    id: number,
    children: number[]
): Database => {
    return {
        ...database,
        [id]: {
            id,
            component_type,
            parent_id,
            children
        }
    }
}

const produceDuplicates = (database: Database, component: Component, parent_id: number = component.parent_id): Component[] => {
    if (component.children.length === 0)
        return [{
            id: getNewId(),
            component_type: component.component_type,
            parent_id: parent_id,
            children: []
        }]

    const duplicateComponent: Component = {
        id: getNewId(),
        component_type: component.component_type,
        parent_id: parent_id,
        children: []
    }

    let duplicatedDescendants: Component[] = [];
    for (let childId of component.children) {
        const childComponent = getComponent(database, childId);
        duplicatedDescendants = produceDuplicates(database, childComponent, duplicateComponent.id);

        for (let descendant of duplicatedDescendants) {
            duplicateComponent.children.push(descendant.id);
        }
    }
    return [duplicateComponent].concat(duplicatedDescendants);
}


const produceIdsToDelete = (database: Database, component: Component): number[] => {
    const toDelete = [component.id];
    for (let childId of component.children) {
        const childComponent = getComponent(database, childId);
        for (let descendantId of produceIdsToDelete(database, childComponent)) {
            toDelete.push(descendantId);
        }
    }
    return toDelete;
}

// When we move a component, we not only modify the children array of the component the child is moved from and the compnent the child is moved to, we also have to update the parent_id of the child to point to the new parent.
export const moveComponent = (
    database: Database,
    componentMovedFrom: Component,
    componentMovedTo: Component,
    childId: number,
    idx: number = componentMovedTo.children.length
): Database => {
    componentMovedFrom = removeChild(componentMovedFrom, childId);
    componentMovedTo = addChild(componentMovedTo, childId, idx);
    return {
        ...database,
        [childId]: {
            ...getComponent(database, childId),
            parent_id: componentMovedTo.id
        },
        [componentMovedFrom.id]: componentMovedFrom,
        [componentMovedTo.id]: componentMovedTo
    };
}

export const addComponent = (database: Database, component: Component): Database => {
    return { ...database, [component.id]: component };
}

export const getComponent = (database: Database, id: number): Component => {
    return database[id];
}

export const deleteComponent = (database: Database, component: Component): Database => {
    const idsToDelete = produceIdsToDelete(database, component);
    for (let id of idsToDelete) {
        delete database[id];
    }
    return database;
}

export const duplicateComponent = (database: Database, component: Component): Database => {
    const duplicates: Component[] = produceDuplicates(database, component);
    for (let duplicate of duplicates) {
        database = addComponent(database, duplicate);
    }
    return database;
}