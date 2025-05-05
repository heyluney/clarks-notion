// import { Component, ComponentType } from '../../types/component_type';
import { Database } from './database_type';
import { getNewId } from '../id_generator/id_generator';
import { addChild, removeChild } from '../component/component';
import { Component } from '../component/component_type';

// Global database for the entire application.
export const database: Database = {};


export const getComponent = (database: Database, id: number) => {
    return database[id];
}

export const insertComponent = (
    database: Database,
    component: Component
) : Database => {
    const parentComponent = getComponent(database, component.parent_id);
    if (parentComponent === undefined) 
        throw new Error("parent component not found!");
    return { ...database,
     [parentComponent.id]: {
        ...parentComponent,
        children: [...parentComponent.children, component.id]
     },
     [component.id]: component 
    }
}

// Returns a list of duplicated components based on original component.
const produceDuplicates = (database: Database, component: Component, parent_id: number = component.parent_id): Component[] => {
    // Component is a leaf node, so return an array of single duplicate.
    if (component.children.length === 0)
        return [{...component, id: getNewId() }]

    const duplicateComponent: Component = 
        {...component, id: getNewId(), parent_id: parent_id, children: []}

    let duplicatedDescendants: Component[] = [];
    for (let child_id of component.children) {
        const childComponent = getComponent(database, child_id);
        duplicatedDescendants = 
            produceDuplicates(database, childComponent, duplicateComponent.id);

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




export const deleteComponent = (database: Database, component: Component): Database => {
    const idsToDelete = produceIdsToDelete(database, component);
    for (let id of idsToDelete) {
        delete database[id];
    }
    return database;
}

export const duplicateComponent 
= (database: Database, component: Component): Database => {
    const duplicates: Component[] = produceDuplicates(database, component);
    for (let duplicate of duplicates) {
        database = insertComponent(database, duplicate);
    }
    return database;
}