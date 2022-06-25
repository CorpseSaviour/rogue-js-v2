import { BoardTile } from "./BoardTile";

export interface RowInterface {
  Columns: Array<BoardTile>;
}

export class BoardRow implements RowInterface {
  Columns: Array<BoardTile>;
  constructor(prop: Array<BoardTile>) {
    this.Columns = prop;
  }
  getColumn(X: number) {
    return this.Columns[X];
  }
}
