export class Todo {
  public id: number;
  public title: string;
  public description: string;
  public img: string;
  public date: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
