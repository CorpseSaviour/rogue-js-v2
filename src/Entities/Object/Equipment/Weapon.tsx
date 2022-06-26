import { Equipment, EquipmentObjectInterface } from "./Equipment";

export interface WeaponInterface {
  min: number;
  max: number;
}

export default class Weapon extends Equipment implements WeaponInterface {
  min: number;
  max: number;
  constructor(object: EquipmentObjectInterface, weapon: WeaponInterface) {
    super(object, { type: "Weapon" });
    this.min = weapon.min;
    this.max = weapon.max;
  }
  damageRange(){
    return (this.max - this.min)
  }
  logProps() {
    console.log(this);
  }
}
