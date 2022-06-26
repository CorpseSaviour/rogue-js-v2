export interface ActionInterface {
  type: string;
}

export class Action {
  type: string;
  constructor(action: ActionInterface) {
    this.type = action.type;
  }
}

export class Move extends Action {
  constructor() {
    super({ type: "Move" });
  }
}

export class Attack extends Action {
  constructor() {
    super({ type: "Attack" });
  }
}
