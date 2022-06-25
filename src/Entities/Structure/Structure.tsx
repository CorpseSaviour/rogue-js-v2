export abstract class Structure {
  passable: Boolean;
  sprite: string;
  name: string;
  constructor(params: { name: string; passable: boolean; sprite: string }) {
    this.passable = params.passable;
    this.name = params.name;
    this.sprite = params.sprite;
  }
  logProps() {
    console.log(this.passable, this.sprite, this.name);
  }
}
