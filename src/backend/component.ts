enum ComponentType {
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
    private static counter : number = 0;

    constructor(
      public parent_id : number,
      public component_type : ComponentType,
      public readonly id: number = Component.counter++,
      public children : number[] = [],
    ) {}

    // Getters
    getChildren() : number[] {
      return this.children;
    }

    getComponentType() : ComponentType {
      return this.component_type;
    }

    addChild(child_id: number, idx: number = this.children.length) : void {
      if (idx < 0 || idx > this.children.length) throw new Error('invalid index!');
      this.children = this.children.toSpliced(idx, 0, child_id);
    }

    removeChild(child_id: number) : void {
      const child_idx = this.children.indexOf(child_id);
      if (child_idx === -1) throw new Error('child not found!');
      this.children = this.children.toSpliced(child_idx, 1);
    }
}


class AppComponent extends Component {
  constructor(
    public parent_id : number,
    public title : string = "Default app",
    ) 
  {
    super(parent_id, ComponentType.App);
    this.title = title;
  }
}

class TestAppComponent extends Component {
  constructor(
    public parent_id : number,
    public id : number,
    public title : string= "Default app"
  ) {
    super(parent_id, ComponentType.App, id);
    this.title = title;
  }
}

class PageComponent extends Component {
  constructor(
    public parent_id : number, 
    public title : string = "Default page"
  ) {
    super(parent_id, ComponentType.Page);
    this.title = title;
  }
}

class EmojiComponent extends Component {
  constructor(
    public parent_id: number,
    public title : string = "Default emoji"
  ) {
    super(parent_id, ComponentType.Emoji);
    this.title = title;
  }
}

export { Component, ComponentType, AppComponent, PageComponent, EmojiComponent };
