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


export interface AppOptions {
    title?: string,
    emoji?: string
}

export interface PageOptions {
    title?: string,
    emoji?: string
}

interface JournalOptions {
    title?: string,
    emoji?: string
}

interface TasklistOptions {
    title?: string,
    emoji?: string
}

interface EmojiOptions {
    title?: string,
    emoji?: string
}

interface CommentOptions {
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

export interface PageComponent extends BaseComponent, PageOptions {
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

interface CommentComponent extends BaseComponent, CommentOptions {
    type: ComponentEnum.Comment
}

// Map from component type to input configuration (configuration necessary to create a component of that type).
export type OptionType<T extends ComponentEnum> =
  T extends ComponentEnum.App ? AppOptions :
  T extends ComponentEnum.Page ? PageOptions :
  T extends ComponentEnum.Tasklist ? TasklistOptions :
  T extends ComponentEnum.Journal ? JournalOptions :
  T extends ComponentEnum.Emoji ? EmojiOptions :
  T extends ComponentEnum.Comment ? CommentOptions : 
  never;

  // Map from component type to a component of that specified type.
export type ComponentType<T extends ComponentEnum> =
  T extends ComponentEnum.App ? AppComponent :
  T extends ComponentEnum.Page ? PageComponent :
  T extends ComponentEnum.Journal ? JournalComponent : 
  T extends ComponentEnum.Tasklist ? TasklistComponent :
  T extends ComponentEnum.Emoji ? EmojiComponent :
  T extends ComponentEnum.Comment ? CommentComponent : 
  never;

export type Component = AppComponent | PageComponent | JournalComponent | TasklistComponent | EmojiComponent | CommentComponent;