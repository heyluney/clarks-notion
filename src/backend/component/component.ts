
import { getNewId } from "../id_generator/id_generator";

import { ComponentEnum, Component, PageComponent, TitleComponent } from '../../types/component_type';

// don't understand how to do personal properties
// title: is it a primitive, or is a component

// if something doesn't have a child (e.g. emoji?), does it make sense for it to be a component? or maybe make it a component with children array being empty? 

// if order does not matter, than it's not in children[]
// tags: component_id
// emoji: component_id 
// we leave it open ended or we define a structure? what if we were to do it open ended for now?

// each parent can only have one child array
// Q: does the children have to be of all one component type?
// A: no, not necessarily, for example a page can have a todolist, and a bunch of flashcards, etc....we will not have this restriction

// when we create a component, all children array will be set to [] array by default

export const createTestComponent = (
  component_type: ComponentEnum,
  parent_id: number,
  id: number = getNewId(),
  children: number[] = []
) : Component => {
  return { 
    id,
    component_type,
    parent_id,
    children
  }
}
// lift up the createCompoennt function to the databsae level?
// create and return one type of component
// but what if the component you're making creates subcomponents by default?

// export const createComponent = (
//   component_type: ComponentEnum, 
//   parent_id: number,
// ) : Component => {
//   return {
//     id: getNewId(),
//     component_type,
//     parent_id,
//     children: []
//   }
// }

// export const createTitle = (
//   parent_id: number,
//   title: string = "Default title"
// ) : TitleComponent => {
//   return {
//     id: getNewId(),
//     title: title,
//     component_type: ComponentEnum.Title,
//     parent_id: parent_id,
//     children: []
//   }
// }
// // create 
// export const createPage = (
//   parent_id: number,
//   title: string = "Default title"
// ) : PageComponent => {
//   const id = getNewId();
//   const titleComponent = createTitle(id, title);
//   return {
//     id: id,
//     component_type: ComponentEnum.Page,
//     parent_id,
//     children: []
//   }
// }

export const getChildren = (component: Component): number[] => {
  return component.children;
}

// Add's child component's id to component's children array. If no index is specified, default behavior is to add the child component at the end. If the index supplied is out of bounds, an error is thrown. Returns the modified parent after the child was added.
export const addChild = (
  component: Component,
  childId: number,
  idx: number = component.children.length
) : Component => {
  if (idx < 0 || idx > component.children.length) 
    throw new Error('invalid index!');
  return {
    ...component,
    children: component.children.toSpliced(idx, 0, childId)
  }
}

// If the child exists in the parent's array, removes the child. Otherwise, throws an error. Returns the modified parent after the child was removed.
export const removeChild = (
  component: Component,
  childId: number
) : Component => {
  const child_idx = component.children.indexOf(childId);
  if (child_idx === -1) throw new Error('child not found!');
  return {
    ...component,
    children: component.children.toSpliced(child_idx, 1)
  };
}