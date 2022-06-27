import { ActionLogInterface } from "Visual/ActionLog/LogItem";

export class ActionLog {
  ActionLogStorage: Array<ActionLogInterface> = [];
  insert(Action: ActionLogInterface) {
    this.ActionLogStorage.unshift(Action);
  }
}
