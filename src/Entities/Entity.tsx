import { Structure } from "./Structure/Structure";
import { Unit } from "./Unit/Unit";

export { Wall } from "./Structure/Wall";
export { Floor } from "./Structure/Floor";
export { Player } from "./Unit/Player";

export interface EntityInterface {
  name: string;
  sprite: string;
}

export interface ActionStatus {
  Action: string;
  Status: Boolean;
  Layer: number | undefined;
  Reason: {
    Entity?: Unit | Structure | undefined
    Text?: string | undefined
  };
}