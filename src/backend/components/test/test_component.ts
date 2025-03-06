import ComponentType from "../../../types/component_type";
import Component from "../component";

// Force explicit instantiation of all fields in order for testing clarity.
class TestComponent extends Component {
    constructor(
        public parent_id: number,
        public component_type: ComponentType,
        public id: number,
        public children: number[]
    ) {
        super(parent_id, component_type, id, children);
    }

    logger() : void {
        console.log(this);
    }
}

export default TestComponent;