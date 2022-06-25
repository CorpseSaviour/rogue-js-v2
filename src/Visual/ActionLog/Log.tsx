//LIBRARIES
import React, { useEffect, useState } from "react";
import { ActionLog } from "../../Utils/ActionLog";

//CSS
import "./Log.css";
import { LogItem } from "./LogItem";

export const Log: React.FC<{ props: ActionLog }> = ({ props }) => {
  const [actionLog, setActionLog] = useState<ActionLog>(props);

  useEffect(() => {
    console.log("ActionLog");
  }, []);
  useEffect(() => {
    setActionLog(props);
  }, [props]);
  return (
    <div className="ActionLog">
      <div>Log history</div>
      <div className="Logs">
        {actionLog &&
          actionLog.ActionLogStorage.map((log, index) => {
            return <LogItem key={index} props={log} />;
          })}
      </div>
    </div>
  );
};
