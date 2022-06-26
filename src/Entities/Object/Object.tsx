export interface ObjectInterface {
  sprite: string;
  name: string;
  superType: string;
}

export class Object {
  sprite: string;
  name: string;
  superType: string;
  constructor(object: ObjectInterface) {
    this.sprite = object.sprite;
    this.name = object.name;
    this.superType = object.superType;
  }
  logProps() {
    console.log(this);
  }
}
