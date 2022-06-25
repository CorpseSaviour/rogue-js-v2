import { EntityInterface } from "Entities/Entity";
import { Structure } from "Entities/Structure/Structure";
import { Unit } from "Entities/Unit/Unit";

export interface TileInterface {
  /** LAYER 0 = STRUCTURE
   *  LAYER 1 = OBJECT
   *  LAYER 2 = UNIT
   */
  layer0: {
    entity: Structure | undefined;
  };
  layer1: {
    entity: Unit | undefined;
  };
  layer2: {
    entity: EntityInterface | undefined;
  };
  X: number;
  Y: number;
}


export class BoardTile implements TileInterface {
  ID: number = Math.random()
  public layer0: { entity: Structure | undefined };
  public layer1: { entity: Unit | undefined };
  public layer2: { entity: EntityInterface | undefined };
  public X: number;
  public Y: number;
  constructor(params: TileInterface) {
    this.layer0 = params.layer0 || { entity: undefined };
    this.layer1 = params.layer1 || { entity: undefined };
    this.layer2 = params.layer2 || { entity: undefined };
    this.X = params.X;
    this.Y = params.Y;
  }
  getHighestPrioritySprite(): string {
    if (this.layer2?.entity?.sprite !== undefined) {
      return this.layer2.entity.sprite;
    } else if (this.layer1?.entity?.sprite !== undefined) {
      return this.layer1.entity.sprite;
    } else if (this.layer0?.entity?.sprite !== undefined) {
      return this.layer0.entity.sprite;
    }
    throw new Error(`Tile at position ${this.X},${this.Y} is empty`);
  }
}
