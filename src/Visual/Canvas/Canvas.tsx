//LIBRARIES
import React, { useEffect, useState } from "react";

//COMPONENTS
import { Tile } from "./Tile";

export interface CanvasInterface {
  Map: Map | undefined;
}

export type Map = Array<Array<string>>;

export const Canvas: React.FC<CanvasInterface> = ({ Map }) => {
  const [canvas, setCanvas] = useState<Map | undefined>(Map);

  useEffect(() => {
    console.log("Canvas Initialized");
  }, []);

  useEffect(() => {
    setCanvas(Map);
  }, [Map]);

  return (
    <div className="max-w-full max-h-full">
      {canvas &&
        canvas.map((row, y) => {
          return (
            <div key={y} className="flex max-w-fit">
              {row &&
                row.map((column, x) => {
                  return (
                    <div key={x} className="w-4 h-4 text-xs">
                      <Tile content={column} />
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
