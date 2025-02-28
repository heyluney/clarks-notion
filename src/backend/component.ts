
const enum ComponentType {
  App = 0,
  Page = 1,
  Comment = 2,
  Emoji = 3,
  Tasklist = 4,
  Journal = 5
}

// Universal data and behaviors for each instance of Component.
class Component {
    // Each Component instance has a unique id.
    private static counter: number = 0;
    public readonly id: number;

    public parent_id: number;
    public children: number[] = [];
    public component_type: ComponentType;

    constructor(
      parent_id : number, 
      component_type : ComponentType
    ) {
      this.id = ++Component.counter;
      this.parent_id = parent_id;
      this.component_type = component_type;
    }

    addChild(child_id: number) : void {
      this.children.push(child_id);
    }

    getChildren() : number[] {
      return this.children;
    }
  }


class AppComponent extends Component {
  title: string = "Default app.";

  constructor(
    parent_id : number = -1, 
    component_type: ComponentType.App, 
    title : string) 
  {
    super(parent_id, component_type);
    this.title = title;
  }
}

class PageComponent extends Component {
  title: string = "Default page.";

  constructor(
    parent_id : number, 
    component_type: ComponentType.Page, 
    title : string) 
  {
    super(parent_id, component_type);
    this.title = title;
  }
}

export { Component, ComponentType, AppComponent, PageComponent };
