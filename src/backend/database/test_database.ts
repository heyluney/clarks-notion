// import { Component, ComponentType } from '../../types/component_type';
import { Database } from './database_type';
import { getNewTestId  } from '../id_generator/test_id_generator';
import { addChild, removeChild } from '../component/component';
import { Component } from '../component/component_type';

// Test database for testing purposes.
export const database: Database = {};

// Fetches component based on it's unique id.
export const getComponent = (database: Database, id: number) => {
    return database[id];
}

// Inserts component into database. Update parent's child array.
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

// Duplicates the component and it's children, inserting all into the database. Returns the updated database.
export const duplicateComponent = 
(database: Database, component: Component, parent_id: number = component.parent_id): Database => {
    const duplicatedComponent = {
        ...component, 
        id: getNewTestId(), 
        parent_id: parent_id,
        children: []
    };
    database = insertComponent(database, duplicatedComponent);
    for (let childId of component.children) {
        database = duplicateComponent(database, 
            getComponent(database, childId), 
            duplicatedComponent.id);
    }

    return database;
}

export const deleteComponent = (database: Database, component: Component): Database => {
    for (let childId of component.children) {
        database = deleteComponent(database, getComponent(database, childId));
    }
    delete database[component.id];
    return database;
}

// childId is the id of the component being moved.
export const moveComponent = (
    database: Database,
    componentMovedFrom: Component,
    componentMovedTo: Component,
    childId: number,
    idx: number = componentMovedTo.children.length
): Database => {
    // this doesn't work because componentMovedTo also needs to have that child removed
    componentMovedFrom = removeChild(componentMovedFrom, childId);
  
    if (componentMovedTo.id === componentMovedFrom.id) 
        componentMovedTo = componentMovedFrom;

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