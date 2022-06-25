import { ActionLogInterface } from "Visual/ActionLog/LogItem";

export class ActionLog {
  ActionLogStorage: Array<ActionLogInterface> = [];
  asdw: string;
  constructor(params: { asdw: string }) {
    this.asdw = params.asdw;
  }
  insert(Action: ActionLogInterface) {
    this.ActionLogStorage.unshift(Action);
  }
}
