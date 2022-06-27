import { ActionStatus, EntityInterface } from "Entities/Entity";
import { TileInterface } from "Entities/GameBoard/BoardTile";
import { GameBoard } from "Entities/GameBoard/GameBoard";
import Weapon from "Entities/Object/Equipment/Weapon";
import { Coordinate } from "Global/types";

interface Actions {
  [key: string]: any;
}
export interface UnitInterface extends EntityInterface {
  hp: number;
  unitIndex: number;
  lvl: number;
}

export interface UnitEquipment {
  weapon: Weapon;
}

export interface Attributes {
  strength: number;
  agility: number;
  constitution: number;
  intelligence: number;
}

export class Unit implements Attributes, UnitInterface, UnitEquipment {
  //Unit
  ID: number = Math.random();
  hp: number;
  sprite: string;
  name: string;
  unitIndex: number;
  lvl: number;
  //Attributes
  strength: number;
  agility: number;
  constitution: number;
  intelligence: number;
  // Equipment
  weapon: Weapon;
  //Game Board
  GameBoard: GameBoard;
  constructor(
    unit: UnitInterface,
    attributes: Attributes,
    equipment: UnitEquipment,
    GameBoard: GameBoard
  ) {
    // Unit
    this.hp = unit.hp;
    this.name = unit.name;
    this.sprite = unit.sprite;
    this.unitIndex = unit.unitIndex;
    this.lvl = unit.lvl;
    //Attributes
    this.strength = attributes.strength;
    this.agility = attributes.agility;
    this.constitution = attributes.constitution;
    this.intelligence = attributes.intelligence;
    //Equipment
    this.weapon = equipment.weapon;
    //Game Board
    this.GameBoard = GameBoard;
  }
  logProps() {
    console.log(this);
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
  private moveUnit(Action: string, GameBoard: GameBoard): ActionStatus {
    const moveModifier: Actions = {
      MoveLeft: { X: -1, Y: 0 },
      MoveUp: { X: 0, Y: -1 },
      MoveDown: { X: 0, Y: 1 },
      MoveRight: { X: 1, Y: 0 },
    };
    let currentCoordinate = GameBoard.findUnit(this.ID);
    let moveCoordinate = {
      X:
        currentCoordinate.X.valueOf() + moveModifier[Action as keyof Actions].X,
      Y:
        currentCoordinate.Y.valueOf() + moveModifier[Action as keyof Actions].Y,
    };
    if (moveCoordinate.Y < 0) {
      return {
        Status: false,
        Action: "Move",
        Layer: 0,
        Reason: { Text: "Out of bounds" },
      };
    } else {
      let Target = GameBoard.getTile(moveCoordinate);
      let canMove = this.canMoveTo(Target);
      if (canMove.Status === false) {
        if (canMove.Layer === 0) {
          return canMove;
        } else if (canMove.Layer === 1) {
          return this.attack(Target);
        }
      }
      return this.move(Target, GameBoard, currentCoordinate);
    }
  }

  private canMoveTo(Tile: TileInterface): ActionStatus {
    if (Tile.layer0.entity?.passable === true) {
      if (Tile.layer1?.entity === undefined) {
        return {
          Status: true,
          Action: "Move",
          Layer: undefined,
          Reason: { Text: "" },
        };
      } else {
        return {
          Status: false,
          Action: "Move",
          Layer: 1,
          Reason: { Entity: Tile.layer1.entity },
        };
      }
    } else {
      return {
        Status: false,
        Action: "Move",
        Layer: 0,
        Reason: { Entity: Tile.layer0?.entity },
      };
    }
  }

  private move(
    Target: TileInterface,
    GameBoard: GameBoard,
    currentCoordinate: Coordinate
  ): ActionStatus {
    let ThisTile = GameBoard.getTile(currentCoordinate);
    if (ThisTile.layer1 && Target.layer1) {
      Target.layer1.entity = ThisTile.layer1?.entity;
      ThisTile.layer1.entity = undefined;
    }
    return { Status: true, Action: "Move", Layer: undefined, Reason: {} };
  }

  private attack(Tile: TileInterface): ActionStatus {
    if (Tile.layer1.entity) {
      let target = Tile.layer1.entity;
      let thisCR = this.agility * this.lvl;
      let targetCR = target.agility * target.lvl;
      let hit = this.calcHit(thisCR, targetCR);
      let damage: number = 0;
      if (hit) {
        damage = this.calcDamage();
        Tile.layer1.entity.takeDamage(damage);
      }
      return {
        Status: hit,
        Action: "Attack",
        Layer: 1,
        Reason: { Entity: Tile.layer1.entity, Text: damage.toString() },
      };
    }
    return {
      Status: false,
      Action: "Attack",
      Layer: 1,
      Reason: { Entity: undefined, Text: "No entity found" },
    };
  }

  // COMBAT CALCULATION METHODS, MAYBE THROW THIS STUFF OUT OF UNIT INTO A UTILS
  private calcHit(unitCR: number, targetCR: number): boolean {
    let chanceToHit = unitCR / targetCR;
    if (chanceToHit > 0.95) {
      chanceToHit = 0.95;
    }
    let RNG = Math.random();
    return RNG <= chanceToHit ? true : false;
  }
  private calcDamage(): number {
    let strengthModifier = Math.floor(this.strength / 5);
    let damage = Math.floor(
      (1 + this.weapon.damageRange() + strengthModifier) * Math.random() +
        this.weapon.min
    );
    return damage;
  }
  private takeDamage(damage: number) {
    this.hp -= damage;
    if (this.hp < 0) {
      this.GameBoard.killUnit(this.ID);
    }
  }
}
