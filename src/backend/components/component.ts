import ComponentType from "../../types/component_type";

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


class TestComponent extends Component {
  constructor(
      public parent_id: number,
      public component_type: ComponentType = ComponentType.App,
      public id: number = 0,
      public children: number[] = []
  ) {
      super(parent_id, component_type, id, children);
  }
}

export { Component, ComponentType, TestComponent };
