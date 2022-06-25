import { KeyboardEvent } from "react";
import { ActionLog } from "./ActionLog";

//ENTITIES
import { GameBoard } from "Entities/GameBoard/GameBoard";
import { NPC } from "Entities/Unit/NPC";
import { Player } from "Entities/Unit/Player";
import { ActionStatus } from "Entities/Entity";

// UTILS
import * as Mapper from "../Utils/Mapper";

export interface KeyBindingsInterface {
  ArrowLeft: string;
  ArrowUp: string;
  ArrowDown: string;
  ArrowRight: string;
}

export class GameController {
  Map: GameBoard;
  KeyBindings: KeyBindingsInterface;
  ActionLog: ActionLog;
  constructor(
    Map: GameBoard,
    KeyBindings: KeyBindingsInterface,
    ActionLog: ActionLog
  ) {
    this.Map = Map;
    this.KeyBindings = KeyBindings;
    this.ActionLog = ActionLog;
  }
  async InputCapture(event: KeyboardEvent<HTMLInputElement>) {
    let Action = this.KeyBindings[event.code as keyof KeyBindingsInterface];
    let playerAction = await this.PlayerAction(Action);
    console.log(playerAction);
    if (playerAction?.Status === true) {
      await this.NextTurn(playerAction);
    }

    // this.LogPlayer();
  }
  async PlayerAction(Action: string) {
    let Player = this.Map.findPlayer() as Player;
    let ActionResult = Player?.Action(Action, this.Map) as ActionStatus;
    this.LogPlayerAction(Player, ActionResult);
    return ActionResult;
  }
  async LogPlayerAction(player: Player, PlayerAction: ActionStatus) {
    PlayerAction.Status === true
      ? console.log("good job")
      : this.ActionLog.insert({ Entity: player, Action: PlayerAction });
  }
  async NextTurn(playerAction: ActionStatus) {
    let Player = this.Map.findPlayer();
    let ActionResults: any[] = [];
    if (this.Map.Units) {
      ActionResults = this.Map.Units.map(async (Unit) => {
        if (Unit.name !== "Player") {
          let NPC = Unit as NPC;
          if (Player) {
            await NPC.checkAgro(this.Map, Player);
            if (NPC.target !== undefined) {
              return NPC.MoveTowardsTarget(this.Map);
            }
          }
        } else {
          return playerAction;
        }
      });
    }
    console.log("ActionResults", ActionResults);
  }
  genCanvas() {
    return Mapper.generateCanvas(this.Map);
  }
  LogPlayer() {
    console.log(
      this.Map.Units?.find((el) => {
        if (el.name === "Player") {
          return this;
        } else {
          return "no player found";
        }
      })
    );
  }
}
