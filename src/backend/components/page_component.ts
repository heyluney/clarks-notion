import { Component, ComponentType } from './component';

// 
class PageComponent extends Component {
  constructor(
    public parent_id : number, 
    public title : string = "Default page"
  ) {
    super(parent_id, ComponentType.Page);
    this.title = title;
  }
}


export default PageComponent;