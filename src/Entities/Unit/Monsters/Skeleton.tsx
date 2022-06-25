import { NPC } from "../NPC";

export class Skeleton extends NPC {
  constructor(params: { unitIndex: number }) {
    super(
      {
        hp: 10,
        name: "Skeleton",
        sprite: "S",
        unitIndex: params.unitIndex,
      },
      { sight: 4 }
    );
  }
}
