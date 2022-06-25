import { Structure } from "./Structure";

export class Wall extends Structure {
  constructor() {
    super({
      name: "Wall",
      sprite: "#",
      passable: false,
    });
  }
}
