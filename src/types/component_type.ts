enum ComponentEnum {
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
    component_type: ComponentType;
    parent_id: number;
    children: number[];
}
export type ComponentType = ComponentMap[keyof ComponentMap]


export interface AppComponent extends Component {
    title: string,
    emoji: string
}

interface PageShape {
    component_type: ComponentEnum,
    title: string,
    emoji: string
}

type ComponentMap = {
    [ComponentEnum.App]: AppComponent,
    [ComponentEnum.Page]: PageShape
}


   
