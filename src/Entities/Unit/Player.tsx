import { Unit } from "./Unit";

export class Player extends Unit {
  constructor(params: {unitIndex:number}) {
    super({
      hp: 100,
      name: "Player",
      sprite: "@",
      unitIndex: params.unitIndex
    });
  }
}
