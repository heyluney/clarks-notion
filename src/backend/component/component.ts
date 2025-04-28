
import { getNewId } from "../id_generator/id_generator";


export enum ComponentType {
  App = "App",
  Page = "Page",
  Comment = "Comment",
  Emoji = "Emoji",
  Tasklist = "Tasklist",
  Journal = "Journal",
  Title = "Title"
}


interface BaseComponent {
  id: number;
  parent_id: number;
  children: [];
}

interface AppComponent extends BaseComponent {
  type: ComponentType.App;
  title: string,
  emoji: string
}

interface PageComponent extends BaseComponent {
  type: ComponentType.Page,
  title: string,
  emoji: string
}

type Component = AppComponent | PageComponent;

export const createComponent = <T extends ComponentType>
(type: T, options: 
      T extends ComponentType.App ? { parent_id: number, title: string, emoji: string} : 
      T extends ComponentType.Page ? { parent_id: number, title: string, emoji: string } : 
never): Extract<Component, {type: T}> => {
  switch (type) {
    case ComponentType.App:
        return { 
              id: getNewId(), 
              parent_id: options.parent_id, 
              type, 
              title: options.title, 
              emoji: options.emoji } as Extract<Component, {type: T}>
    case ComponentType.Page:
        return { id: getNewId(), 
              parent_id: options.parent_id,
              type, 
              title: options.title, 
              emoji: options.emoji, 
              children: [] } as Extract<Component, {type: T}>
    default:
        throw new Error("Invalid component type")
  }
}

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