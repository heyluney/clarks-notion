
import { getNewId } from "../id_generator/id_generator";
import { ComponentEnum as CE, defaultOptionMap, OptionType, ComponentType } from "./component_type";


export const createTestComponent =
  <T extends CE>(type: T,
    id: number,
    parent_id: number = -1,
    children: number[] = [],
    options: OptionType<T> = {} as OptionType<T>): ComponentType<T> => {
    return {
      type,
      id,
      parent_id,
      children,
      ...defaultOptionMap[type],
      ...options
    }
  }

export const createComponent =
  <T extends CE>(type: T,
    parent_id: number,
    options: OptionType<T> = {} as OptionType<T>): ComponentType<T> => {
    return {
      type,
      id: type === CE.App ? 0 : getNewId(),
      parent_id,
      children: [],
      ...defaultOptionMap[type],
      ...options
    };
  }

export const getChildren =
  <T extends CE>(component: ComponentType<T>): number[] => {
    return component.children;
  }

export const addChild =
  <T extends CE>(component: ComponentType<T>,
    childId: number,
    idx: number = component.children.length
  ): ComponentType<T> => {
    if (idx < 0 || idx > component.children.length)
      throw new Error('invalid index!');
    return {
      ...component,
      children: component.children.toSpliced(idx, 0, childId)
    }
  }

export const removeChild = <T extends CE>(
  component: ComponentType<T>,
  childId: number
): ComponentType<T> => {
  const child_idx = component.children.indexOf(childId);
  if (child_idx === -1) throw new Error('child not found!');
  return {
    ...component,
    children: component.children.toSpliced(child_idx, 1)
  };
}