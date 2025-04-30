// Each unique type of component is uniquely defined by an entry in this enum.
export enum ComponentEnum {
    App = "App",
    Page = "Page",
    Comment = "Comment",
    Emoji = "Emoji",
    Tasklist = "Tasklist",
    Journal = "Journal",
    Title = "Title"
}

// Default values for components. 
export const defaultOptionMap: { [key in ComponentEnum]: any } = {
    [ComponentEnum.App]: { title: "default", emoji: "default" },
    [ComponentEnum.Page]: { title: "default", emoji: "default" },
    [ComponentEnum.Comment]: { title: "default", emoji: "default" },
    [ComponentEnum.Emoji]: { title: "default", emoji: "default" },
    [ComponentEnum.Tasklist]: { title: "default", emoji: "default" },
    [ComponentEnum.Journal]: { title: "default", emoji: "default" },
    [ComponentEnum.Title]: { title: "default", emoji: "default" },
}


interface BaseOptions {
    parent_id: number;
}

export interface AppOptions extends BaseOptions {
    title?: string,
    emoji?: string
}

export interface PageOptions extends BaseOptions {
    title?: string,
    emoji?: string
}

export interface JournalOptions extends BaseOptions {
    title?: string,
    emoji?: string
}

export interface TasklistOptions extends BaseOptions {
    title?: string,
    emoji?: string
}

interface EmojiOptions extends BaseOptions {
    title?: string,
    emoji?: string
}


// Attributes universal to each component.
interface BaseComponent {
    readonly id: number; // Once assigned, id is fixed.
    parent_id: number;
    children: number[];
}

interface AppComponent extends BaseComponent, AppOptions {
    type: ComponentEnum.App
}

interface PageComponent extends BaseComponent, PageOptions {
    type: ComponentEnum.Page
}

interface JournalComponent extends BaseComponent, JournalOptions {
    type: ComponentEnum.Journal
}

interface TasklistComponent extends BaseComponent, TasklistOptions {
    type: ComponentEnum.Tasklist
}

interface EmojiComponent extends BaseComponent, EmojiOptions {
    type: ComponentEnum.Emoji
}

// Map from component type to input configuration (configuration necessary to create a component of that type).
export type optionType<T extends ComponentEnum> =
  T extends ComponentEnum.App ? AppOptions :
  T extends ComponentEnum.Page ? PageOptions :
  T extends ComponentEnum.Tasklist ? TasklistOptions :
  T extends ComponentEnum.Journal ? JournalOptions :
  T extends ComponentEnum.Emoji ? EmojiOptions :
  never;

  // Map from component type to a component of that specified type.
export type componentType<T extends ComponentEnum> =
  T extends ComponentEnum.App ? AppComponent :
  T extends ComponentEnum.Page ? PageComponent :
  T extends ComponentEnum.Journal ? JournalComponent : 
  T extends ComponentEnum.Tasklist ? TasklistComponent :
  T extends ComponentEnum.Emoji ? EmojiComponent :
  never;
