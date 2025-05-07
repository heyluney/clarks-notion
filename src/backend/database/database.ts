import { Database } from './database_type';
import { getNewId } from '../id_generator/id_generator';
import { addChild, removeChild } from '../component/component';
import { Component, ComponentEnum as CE, ComponentType } from '../component/component_type';

// Production database for the application.
export let database: Database = {};

// Retrieves all pages in the database.
export const retrievePages = (db : Database) : ComponentType<CE.Page>[] => {
    console.log('db', db)
    return Object.values(db).filter(component => component.type === CE.Page);
}

export const getDatabase = () => database;

export const setDatabase = (updatedDB : Database) => {
    database = updatedDB;
}

export const getComponent = (database: Database, id: number) => {
    return database[id];
}

// Inserts component into database. Update parent's reference to child.
export const insertComponent = (
    database: Database,
    component: Component
) : Database => {
    // If the component inserted into the database is of type App, no parent is required.
    if (component.type === CE.App) {
         return { [component.id]: component }
    }
    const parentComponent = getComponent(database, component.parent_id);
    if (parentComponent === undefined) 
        throw new Error("parent component not found!");

    // we will create a component first, then
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
        id: getNewId(), 
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

// Removes a component and all of it's children from the database.
export const deleteComponent = (database: Database, component: Component): Database => {
    for (let childId of component.children) {
        database = deleteComponent(database, getComponent(database, childId));
    }
    delete database[component.id];
    return database;
}


// Moves a component with id=childId from componentMovedFrom to componentMovedTo (can be the same component).
export const moveComponent = (
    database: Database,
    componentMovedFrom: Component,
    componentMovedTo: Component,
    childId: number,
    idx: number = componentMovedTo.children.length
): Database => {
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