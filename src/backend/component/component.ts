
import { getNewId } from "../id_generator/id_generator";
import { ComponentEnum as CE, defaultOptionMap, optionType, componentType } from "./component_types";

export const createComponent = 
<T extends CE>(type: T, options: optionType<T>): componentType<T> => {
  return {
    type,
    id: getNewId(),
    children: [],
    ...defaultOptionMap[type],
    ...options
  };
}
export const getChildren = 
<T extends CE>(component : componentType<T>) : number[] => {
  return component.children;
}

export const addChild = 
<T extends CE>(component : componentType<T>, 
              childId: number, 
              idx: number = component.children.length
): componentType<T> => {
  if (idx < 0 || idx > component.children.length)
    throw new Error('invalid index!');
  return {
    ...component,
    children: component.children.toSpliced(idx, 0, childId)
  }
}

export const removeChild = <T extends CE>(
  component: componentType<T>,
  childId: number
): componentType<T> => {
  const child_idx = component.children.indexOf(childId);
  if (child_idx === -1) throw new Error('child not found!');
  return {
    ...component,
    children: component.children.toSpliced(child_idx, 1)
  };
}