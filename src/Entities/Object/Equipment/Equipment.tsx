import { Object } from "../Object";

export interface EquipmentInterface {
  type: string;
}

export interface EquipmentObjectInterface {
  sprite: string;
  name: string;
}

export class Equipment extends Object {
  type: string;
  constructor(object: EquipmentObjectInterface, equipment: EquipmentInterface) {
    super({ ...object, superType: "Equipment" });
    this.type = equipment.type;
  }
}
