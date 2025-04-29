
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



// Attributes universal to each component.
interface BaseComponent {
  readonly id: number; // once assigned, the id is fixed
  parent_id: number;
  children: number[];
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


export const createTestComponent = <T extends ComponentType>(type: T, id: number, options: 
  T extends ComponentType.App ? { parent_id: number, title?: string, emoji?: string } : 
  T extends ComponentType.Page ? { parent_id: number, title?: string, emoji?: string } : 
  never) : Component => {
  const newComponent: BaseComponent = 
      {id: id, parent_id: options.parent_id, children: []};
  switch (type) {
    case ComponentType.App:
        let app = newComponent as AppComponent;
        app.title = options.title || "default";
        app.emoji = options.emoji || "default";
        return app;
    case ComponentType.Page:
        let page = newComponent as PageComponent;
        page.title = options.title || "default";
        page.emoji = options.emoji || "default"
        return page;
    default:
        throw new Error("Invalid component type")
  }
}


interface Options {
  parent_id: number;
}

interface AppOptions extends Options {
  title: string,
  emoji: string
}

interface PageOptions extends Options {
  title: string,
  emoji: string
}

type map = {
  [ComponentType.App]: AppOptions, // appoptions is a type but it's being used as a value
  [ComponentType.Page]: PageOptions
};

// type InterfaceKey = keyof typeof map;
// type getInterface<K extends InterfaceKey> = typeof map[K];

// const getInterface = <K extends InterfaceKey>(key: K): getInterface<K> => {
//   return map[key];
// }

// I need to get the type 
export const createComponent = <T extends ComponentType>(type: T, options: typeof map[type] ) : Component => {
  const newComponent: BaseComponent = {id: getNewId(), parent_id: options.parent_id, children: []};
  // return newComponent as 
  console.log('type', type)
  console.log('options', options, typeof options)
  console.log(typeof newComponent);
  switch (type) {
    case ComponentType.App:
      let app = newComponent as AppComponent;
        return {...app, ...options, type: type};
    case ComponentType.Page:
      let page = newComponent as PageComponent;
        return {...page, ...options, type: type};
    default:
        throw new Error("Invalid component type")
  }
}

export const getChildren = (component: Component): number[] => {
  return component.children;
}

// Add's child component's id to component's children array. If no index is specified, default behavior is to add the child component at the end. If the index supplied is out of bounds, an error is thrown. Returns the modified parent after the child was added.

// component.children.toSpliced(idx, 0, childId)
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