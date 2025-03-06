import Component from './component';
import ComponentType from '../../types/component_type';

class EmojiComponent extends Component {
    constructor(
      public parent_id: number,
      public title : string = "Default emoji"
    ) {
      super(parent_id, ComponentType.Emoji);
      this.title = title;
    }
}

export default EmojiComponent;

  