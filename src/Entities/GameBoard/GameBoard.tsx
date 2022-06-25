import { Player } from "../Entity";
import { Unit } from "../Unit/Unit";
import { BoardRow } from "./BoardRow";
import { BoardTile } from "./BoardTile";

export class GameBoard {
  public Rows: Array<BoardRow>;
  public mapWidth: number;
  public mapHeight: number;
  public Units: Array<Unit>;

  constructor(params: {
    Rows: Array<BoardRow>;
    mapWidth: number;
    mapHeight: number;
    Units: Array<Unit>;
  }) {
    this.Rows = params.Rows;
    this.mapWidth = params.mapWidth;
    this.mapHeight = params.mapHeight;
    this.Units = params.Units;
  }

  getRow(Y: number) {
    return this.Rows[Y];
  }

  getTile(coordinate: { X: number; Y: number }) {
    return this.getRow(coordinate.Y).getColumn(coordinate.X);
  }
  setTile(coordinate: { X: number; Y: number }, newTile: BoardTile) {
    this.Rows[coordinate.Y].Columns[coordinate.X] = new BoardTile(newTile);
  }

  findUnit(Unit: Unit): { X: number; Y: number } {
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        if (this.Rows[y].Columns[x].layer1.entity?.ID === Unit.ID) {
          return { X: x, Y: y };
        }
      }
    }
    return { X: -1, Y: -1 };
  }

  findPlayer(): Player | undefined {
    for (let i = 0; i < this.Units.length; i++) {
      if (this.Units[i].name === "Player") {
        return this.Units[i];
      }
    }
  }

  updateUnit(index: number, unit: Unit | undefined) {
    if (unit === undefined) {
      this.Units.splice(index, 1);
    }
    if (this.Units[index] && unit) {
      this.Units[index] = unit;
    }
  }
}
