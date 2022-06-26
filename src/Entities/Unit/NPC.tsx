import { GameBoard } from "Entities/GameBoard/GameBoard";
import { Player } from "./Player";
import { Attributes, Unit, UnitEquipment, UnitInterface } from "./Unit";

export class NPC extends Unit {
  lastAction: string | undefined = undefined;
  target: Unit | undefined = undefined;
  sight: number;
  constructor(
    unit: UnitInterface,
    NPC: { sight: number },
    attributes: Attributes,
    equipment: UnitEquipment
  ) {
    super(unit, attributes, equipment);
    this.sight = NPC.sight;
  }

  checkAgro(map: GameBoard, player: Player) {
    let currentPosition = map.findUnit(this);
    let playerPosition = map.findUnit(player);
    let X = currentPosition.X.valueOf() - playerPosition.X.valueOf();
    let Y = currentPosition.Y.valueOf() - playerPosition.Y.valueOf();
    let distance = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
    if (distance < this.sight) {
      this.target = player;
    }
  }
  MoveTowardsTarget(map: GameBoard) {
    if (this.target) {
      let current = map.findUnit(this);
      let target = map.findUnit(this.target);
      let xAffinity = current.X.valueOf() - target.X.valueOf();
      let yAffinity = current.Y.valueOf() - target.Y.valueOf();
      let Action;
      Math.abs(xAffinity) > Math.abs(yAffinity)
        ? xAffinity < 0
          ? (Action = "MoveRight")
          : (Action = "MoveLeft")
        : yAffinity < 0
        ? (Action = "MoveDown")
        : (Action = "MoveUp");
      return this.Action(Action, map);
    }
  }
  distanceFromTarget(map: GameBoard) {
    if (this.target) {
      let currentPosition = map.findUnit(this);
      let playerPosition = map.findUnit(this.target);
      let X = currentPosition.X.valueOf() - playerPosition.X.valueOf();
      let Y = currentPosition.Y.valueOf() - playerPosition.Y.valueOf();
      return Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
    }
  }
}
