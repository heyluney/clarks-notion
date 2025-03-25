// Each enum 
export enum ComponentEnum {
    App = "App",
    Page = "Page",
    Comment = "Comment",
    Emoji = "Emoji",
    Tasklist = "Tasklist",
    Journal = "Journal",
    Title = "Title"
}

export interface Component {
    id: number;
    component_type: ComponentEnum;
    parent_id: number;
    children: number[];
}

export interface TitleComponent extends Component {
    title: string
}

export interface PageComponent extends Component {
    title: ComponentEnum.Title,
    emoji: ComponentEnum.Emoji
}