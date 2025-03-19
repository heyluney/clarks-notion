export enum ComponentEnum {
    App = "App",
    Page = "Page",
    Comment = "Comment",
    Emoji = "Emoji",
    Tasklist = "Tasklist",
    Journal = "Journal"
}

export type ComponentType = {
    id: number;
    component_type: ComponentEnum;
    parent_id: number;
    children: number[];
}