import Weapon from "Entities/Object/Equipment/Weapon";
import { NPC } from "../NPC";
import { UnitEquipment } from "../Unit";

const Unit = {
  hp: 10,
  name: "Skeleton",
  sprite: "S",
  lvl: 1,
};

const Attributes = {
  agility: 6,
  constitution: 2,
  intelligence: 2,
  strength: 2,
};

const Equipment: UnitEquipment = {
  weapon: new Weapon({ name: "bones", sprite: "/" }, { min: 0, max: 2 }),
};

export class Skeleton extends NPC {
  constructor(params: { unitIndex: number }) {
    super(
      {
        ...Unit,
        unitIndex: params.unitIndex,
      },
      { sight: 4 },
      Attributes,
      Equipment
    );
  }
}
