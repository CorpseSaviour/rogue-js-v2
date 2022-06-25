//LIBRARIES
import { ActionStatus } from "Entities/Entity";
import { Unit } from "Entities/Unit/Unit";
import React, { useEffect, useState } from "react";

export interface ActionLogInterface {
  Entity: Unit;
  Action: ActionStatus;
}

export const LogItem: React.FC<{ props: ActionLogInterface }> = ({ props }) => {
  const [content, setContent] = useState<ActionLogInterface>(props);

  useEffect(() => {
    console.log("ActionLog");
  }, []);
  useEffect(() => {
    setContent(props);
  }, [props]);
  function formatLog() {
    let LogText = "";
    content.Entity.name === "Player"
      ? (LogText += "You")
      : (LogText += content.Entity.name);
    content.Action.Status === false 
      ? LogText += " can't move there, " + content.Action.Reason.Entity?.name + " is in the way."
      : (LogText += "");
    return LogText;
  }
  return <div className="LogItem">{formatLog()}</div>;
};
