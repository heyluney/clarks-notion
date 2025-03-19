
import { getNewId } from "../id_generator/id_generator";

import { ComponentEnum, ComponentType } from '../../types/component_type';

export const createComponent = (
  component_type: ComponentEnum, 
  parent_id: number,
  id: number = getNewId(),
  children: number[] = []
) : ComponentType => {
  return {
    id,
    component_type,
    parent_id,
    children
  }
}

export const getChildren = (component: ComponentType): number[] => {
  return component.children;
}

// Add's child component's id to component's children array. If no index is specified, default behavior is to add the child component at the end. If the index supplied is out of bounds, an error is thrown. Returns the modified parent after the child was added.
export const addChild = (
  component: ComponentType,
  childId: number,
  idx: number = component.children.length
) : ComponentType => {
  if (idx < 0 || idx > component.children.length) 
    throw new Error('invalid index!');
  return {
    ...component,
    children: component.children.toSpliced(idx, 0, childId)
  }
}

// If the child exists in the parent's array, removes the child. Otherwise, throws an error. Returns the modified parent after the child was removed.
export const removeChild = (
  component: ComponentType,
  childId: number
) : ComponentType => {
  const child_idx = component.children.indexOf(childId);
  if (child_idx === -1) throw new Error('child not found!');
  return {
    ...component,
    children: component.children.toSpliced(child_idx, 1)
  };
}