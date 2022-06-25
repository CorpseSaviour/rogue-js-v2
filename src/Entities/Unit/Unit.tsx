import { ActionStatus, EntityInterface } from "Entities/Entity";
import { TileInterface } from "Entities/GameBoard/BoardTile";
import { GameBoard } from "Entities/GameBoard/GameBoard";

export interface UnitInterface extends EntityInterface {
  hp: number;
  unitIndex: number;
}

interface Actions {
  [key: string]: any;
}

export class Unit {
  ID: number = Math.random();
  hp: number;
  sprite: string;
  name: string;
  unitIndex: number;
  constructor(params: UnitInterface) {
    this.hp = params.hp;
    this.name = params.name;
    this.sprite = params.sprite;
    this.unitIndex = params.unitIndex;
  }
  Action(Action: string, GameBoard: GameBoard) {
    switch (Action) {
      case "MoveLeft":
      case "MoveUp":
      case "MoveDown":
      case "MoveRight":
        return this.moveUnit(Action, GameBoard);
      default:
        break;
    }
  }
  moveUnit(Action: string, GameBoard: GameBoard): ActionStatus {
    const moveModifier: Actions = {
      MoveLeft: { X: -1, Y: 0 },
      MoveUp: { X: 0, Y: -1 },
      MoveDown: { X: 0, Y: 1 },
      MoveRight: { X: 1, Y: 0 },
    };
    let currentCoordinate = GameBoard.findUnit(this);
    let moveCoordinate = {
      X:
        currentCoordinate.X.valueOf() + moveModifier[Action as keyof Actions].X,
      Y:
        currentCoordinate.Y.valueOf() + moveModifier[Action as keyof Actions].Y,
    };
    if (moveCoordinate.Y < 0) {
      return {
        Status: false,
        Layer: 0,
        Reason: { Text: "Out of bounds" },
      };
    } else {
      let NextTile = GameBoard.getTile(moveCoordinate);
      let MoveStatus = this.canMoveTo(NextTile);
      if (MoveStatus.Status === false) {
        return MoveStatus;
      }
      let ThisTile = GameBoard.getTile(currentCoordinate);
      if (ThisTile.layer1 && NextTile.layer1) {
        NextTile.layer1.entity = ThisTile.layer1?.entity;
        ThisTile.layer1.entity = undefined;
      }
      return { Status: true, Layer: undefined, Reason: {} };
    }
  }

  canMoveTo(Tile: TileInterface) {
    return Tile.layer0?.entity?.passable === true
      ? Tile.layer1?.entity === undefined
        ? { Status: true, Layer: undefined, Reason: { Text: "" } }
        : { Status: false, Layer: 1, Reason: { Entity: Tile.layer1.entity } }
      : { Status: false, Layer: 0, Reason: { Entity: Tile.layer0?.entity } };
  }
  logProps() {
    console.log(this.hp, this.sprite, this.name);
  }
}
