//INTERFACES
import { Player } from "Entities/Unit/Player";
import { Unit } from "Entities/Unit/Unit";
import { Structure } from "Entities/Structure/Structure";
import { Floor, Wall } from "Entities/Entity";
import { GameBoard } from "Entities/GameBoard/GameBoard";
import { BoardTile } from "Entities/GameBoard/BoardTile";
import { Skeleton } from "Entities/Unit/Monsters/Skeleton";
import { BoardRow } from "Entities/GameBoard/BoardRow";
import { Map } from "Visual/Canvas/Canvas";

export namespace Mapper {
  export function MapFromJSON(simpleMap: Array<Array<string>>): GameBoard {
    let CanvasHeight = simpleMap.length;
    let CanvasWidth = simpleMap[0].length;
    console.log("CanvasHeight", CanvasHeight);
    console.log("CanvasWidth", CanvasWidth);
    let NewGameBoard: GameBoard = new GameBoard({
      Rows: [],
      Units: [],
      mapHeight: CanvasHeight,
      mapWidth: CanvasWidth,
    });

    for (let y = 0; y < CanvasHeight; y++) {
      //CREATE EMPTY ROW INSTANCE
      let NewRow: BoardRow = new BoardRow([]);
      for (let x = 0; x < CanvasWidth; x++) {
        //CREATE EMPTY LINE INSTANCE
        let unit: Unit | undefined;
        let structure: Structure | undefined;
        let object: Object | undefined;
        let NewTile: BoardTile = new BoardTile({
          layer0: { entity: undefined },
          layer1: { entity: undefined },
          layer2: { entity: undefined },
          X: x,
          Y: y,
        });
        let tile = simpleMap[y][x];
        if (tile === "#") {
          structure = new Wall();
          unit = undefined;
          object = undefined;
        } else if (tile === ".") {
          structure = new Floor();
          unit = undefined;
          object = undefined;
        } else if (tile === "@") {
          structure = new Floor();
          unit = new Player(NewGameBoard.Units.length, NewGameBoard);
          object = undefined;
          NewGameBoard.Units?.push(unit);
        } else if (tile === "S") {
          structure = new Floor();
          unit = new Skeleton(NewGameBoard.Units.length, NewGameBoard);
          object = undefined;
          NewGameBoard.Units?.push(unit);
        }
        if (NewTile.layer0 && structure) {
          NewTile.layer0.entity = structure;
        }
        if (NewTile.layer1 && structure) {
          NewTile.layer1.entity = unit;
        }
        NewRow.Columns?.push(NewTile);
      }
      NewGameBoard?.Rows?.push(NewRow);
    }
    return NewGameBoard;
  }

  export function generateCanvas(GameBoard: GameBoard): Map {
    let Canvas: Map = GameBoard.Rows.map((Row) => {
      return Row.Columns.map((Column) => {
        return Column.getHighestPrioritySprite();
      });
    });
    return Canvas;
  }
}
