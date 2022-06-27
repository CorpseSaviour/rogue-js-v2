import { GameBoard } from "Entities/GameBoard/GameBoard";
import Weapon from "Entities/Object/Equipment/Weapon";
import { Attributes, Unit, UnitEquipment } from "./Unit";

const hardCodedAttributes: Attributes = {
  agility: 5,
  constitution: 5,
  intelligence: 5,
  strength: 5,
};

const PlayerUnit = {
  hp: 20,
  name: "Player",
  sprite: "@",
  lvl: 1,
};

const PlayerEquipment: UnitEquipment = {
  weapon: new Weapon({ name: "fists", sprite: "^" }, { min: 1, max: 2 }),
};

export class Player extends Unit {
  constructor(
    unitIndex: number,
    // attributes: Attributes = hardCodedAttributes,
    GameBoard: GameBoard
  ) {
    super(
      {
        ...PlayerUnit,
        unitIndex,
      },
      hardCodedAttributes,
      PlayerEquipment,
      GameBoard
    );
  }
}
