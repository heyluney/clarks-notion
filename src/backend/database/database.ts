import { ComponentType } from '../../types/component_type';
import { DatabaseType } from '../../types/database_type';
import { getNewId, readOnlyGetNewId } from '../id_generator/id_generator';
import { addChild, removeChild } from '../component/component';

// Global database for the entire application.
export const database : DatabaseType = {};

// Given a single component, generates duplicate components for entire subtree of children.
const produceDuplicates = (database: DatabaseType, component: ComponentType,  parent_id: number = component.parent_id): ComponentType[] => {

    console.log('blahblahblah!!!', readOnlyGetNewId());
    if (component.children.length === 0)
        // if a component does not have children, then return a simple duplicate
        return [{
            id: getNewId(),
            component_type: component.component_type,
            parent_id: parent_id,
            children: []
        }]
    
    const duplicateComponent: ComponentType = {
        id: getNewId(),
        component_type: component.component_type,
        parent_id: parent_id,
        children: []
    }

    let duplicatedDescendants: ComponentType[] = [];
    for (let childId of component.children) {
        const childComponent = getComponent(database, childId);
        duplicatedDescendants = produceDuplicates(database, childComponent, duplicateComponent.id);

        for (let descendant of duplicatedDescendants) {
            duplicateComponent.children.push(descendant.id);
        }
    }
    return [duplicateComponent].concat(duplicatedDescendants);
}


const produceIdsToDelete = (database: DatabaseType, component: ComponentType): number[] => {
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
    database: DatabaseType, 
    componentMovedFrom: ComponentType, 
    componentMovedTo: ComponentType, 
    childId: number, 
    idx: number = componentMovedTo.children.length
) : DatabaseType => {
    componentMovedFrom = removeChild(componentMovedFrom, childId);
    componentMovedTo = addChild(componentMovedTo, childId, idx);
    return { ...database,
        [childId]: {
            ...getComponent(database, childId),
            parent_id: componentMovedTo.id
        },
        [componentMovedFrom.id]: componentMovedFrom, 
        [componentMovedTo.id]: componentMovedTo 
    };
}

export const addComponent = ( database: DatabaseType, component: ComponentType): DatabaseType => {
    return { ...database, [component.id]: component};
}

export const getComponent = (database: DatabaseType, id: number): ComponentType => {
    return database[id];
}

export const deleteComponent = (database: DatabaseType, component: ComponentType): DatabaseType => {
    const idsToDelete = produceIdsToDelete(database, component);
    for (let id of idsToDelete) {
        delete database[id];
    }
    return database;
}

export const duplicateComponent = (database: DatabaseType, component: ComponentType): DatabaseType => {
    const duplicates: ComponentType[] = produceDuplicates(database, component);
    for (let duplicate of duplicates) {
        database = addComponent(database, duplicate);
    }
    return database;
}