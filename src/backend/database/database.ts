import { Component, ComponentEnum } from '../../types/component_type';
import { Database } from '../../types/database_type';
import { getNewId } from '../id_generator/id_generator';
import { addChild, removeChild } from '../component/component';

// Global database for the entire application.
export const database : Database = {};


export const createComponent = (
  database: Database,
  component_type: ComponentEnum, 
  parent_id: number,
) : Database => {
  const newId = getNewId();
  return {
    ...database,
    [newId]: {
        id: newId,
        component_type,
        parent_id,
        children: []
    }
  }
}

// moving => return updated database
export const createTitle = (
    parent_id: number,
    title: string = "Default title"
  ) : Database => {
    return {
      id: getNewId(),
      title: title,
      component_type: ComponentEnum.Title,
      parent_id: parent_id,
      children: []
    }
  }

  // create 
  export const createPage = (
    database: Database,
    parent_id: number,
  ) : Database => {
    const id = getNewId();
    const titleComponent = createTitle(id, title);
    return {
      id: id,
      component_type: ComponentEnum.Page,
      parent_id,
      children: []
    }
  }

  
// Specifying id is explicit for testing.
export const createTestComponent = (
    database: Database,
    component_type: ComponentEnum,
    parent_id: number,
    id: number,
    children: number[]
  ) : Database => {
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


const produceDuplicates = (database: Database, component: Component,  parent_id: number = component.parent_id): Component[] => {
    if (component.children.length === 0)
        // if a component does not have children, then return a simple duplicate
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
) : Database => {
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

export const addComponent = ( database: Database, component: Component): Database => {
    return { ...database, [component.id]: component};
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