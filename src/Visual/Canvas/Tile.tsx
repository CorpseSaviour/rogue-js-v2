///LIBRARIES
import React, { useEffect, useState } from "react";

interface Tile {
  content: string;
}

export const Tile: React.FC<Tile> = ({ content }) => {
  const [text, setText] = useState<string>(content);

  useEffect(() => {
    setText(content);
  }, [content]);

  return (
    <div
      onClick={() => {
        const element = document.getElementById("gameFocus");
        element?.focus();
      }}
      className="flex align-center justify-center;"
    >
      {text}
    </div>
  );
};
