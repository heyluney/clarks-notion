import ComponentType from "../../types/component_type";

import IdGenerator from "../database/id_generator";

class Component<Type extends ComponentType> {
    constructor(
      public parent_id : number = -1,
      public component_type : Type,
      public readonly id: number = IdGenerator.getNewId(),
      public children : number[] = [],
    ) {}

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




export default Component;
