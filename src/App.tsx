//LIBRARIES
import { useEffect, useState, KeyboardEvent } from "react";
import * as Mapper from "./Utils/Mapper";

//INTERFACES

//COMPONENTS
import { Canvas, Map } from "./Visual/Canvas/Canvas";
import { GameController } from "./Utils/GameController";
import { GameBoard } from "./Entities/GameBoard/GameBoard";
import { Log } from "./Visual/ActionLog/Log";
import { ActionLog } from "./Utils/ActionLog";

function App() {
  const [focus, setFocus] = useState(false);
  const [canvas, setCanvas] = useState<Map>();
  const [gameController, setGameController] = useState<GameController>();
  const [ActionsLog, setActionsLog] = useState<ActionLog>();
  useEffect(() => {
    async function initMap() {
      //FETCH MAP AND CONFIGS FROM FILE
      console.log("Fetching Map");
      let mapData = await (await fetch("maps/map1.json")).json();
      console.log("Fetching Keybindings");
      let KeyBindings = await (await fetch("keybindings.json")).json();
      //EXTRACT ENTITIES FROM MAP
      let BuiltMap: GameBoard = Mapper.MapFromJSON(mapData.Map);
      console.log("Finished Building Map");
      setCanvas(Mapper.generateCanvas(BuiltMap));
      let ActionsLog = new ActionLog({ asdw: "" });
      setActionsLog(ActionsLog);
      setGameController(new GameController(BuiltMap, KeyBindings, ActionsLog));
    }
    initMap();
  }, []);

  async function handleInput(event: KeyboardEvent<HTMLInputElement>) {
    await gameController?.InputCapture(event);
    setCanvas(gameController?.genCanvas());
  }
  return (
    <div className="flex w-full h-full items-center justify-center">
      <input
        className="absolute -z-10 outline-none"
        value={""}
        readOnly
        id="gameFocus"
        onBlur={() => {
          setFocus(false);
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleInput(e);
        }}
      ></input>
      <Canvas Map={canvas} />
      {ActionsLog && <Log props={ActionsLog} />}
    </div>
  );
}

export default App;
