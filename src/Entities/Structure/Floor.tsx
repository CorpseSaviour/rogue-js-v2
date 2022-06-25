import { Structure } from "./Structure";

export class Floor extends Structure {
  constructor() {
    super({
      name: "Floor",
      sprite: ".",
      passable: true,
    });
  }
}
