//LIBRARIES
import { ActionStatus } from "Entities/Entity";
import { Unit } from "Entities/Unit/Unit";
import React, { useEffect, useState } from "react";

export interface ActionLogInterface {
  Entity: Unit;
  Action: ActionStatus;
}

export const LogItem: React.FC<{ Log: ActionLogInterface }> = ({ Log }) => {
  const [content, setContent] = useState<ActionLogInterface>(Log);

  useEffect(() => {
    setContent(Log);
  }, [Log]);

  function formatLog() {
    if (Log.Action.Action === "Attack") {
      return formatAttack(Log);
    } else if (Log.Action.Action === "Move") {
      return formatMoveFail(Log);
    } else return "";
    let LogText = "";
  }

  function formatMoveFail(Log: ActionLogInterface) {
    return (
      "You can't move there, " +
      content.Action.Reason.Entity?.name +
      " is in the way."
    );
  }

  function formatAttack(Log: ActionLogInterface) {
    let Attacker = Log.Entity.name;
    let Target = "" + Log.Action.Reason.Entity?.name;
    if (Log.Action.Status) {
      return formatHit(Attacker, Target, "" + Log.Action.Reason.Text);
    } else {
      return formatMiss(Attacker, Target);
    }
  }
  function formatHit(Attacker: string, Target: string, Damage: string) {
    return Attacker + " hits " + Target + " dealing " + Damage + " damage!";
  }
  function formatMiss(Attacker: string, Target: string) {
    return Attacker + " tries to hit " + Target + " but misses...";
  }

  return <div className="LogItem">{formatLog()}</div>;
};
