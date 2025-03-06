import ComponentType from '../../types/component_type';
import Component from './component';

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

export default AppComponent;