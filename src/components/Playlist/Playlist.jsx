import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../utils/context";

import "./Playlist.css";

export default function Playlist() {
  const [context, setContext] = useContext(Context);
  const { playlist, nowPlaying } = context;
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  let scrl = useRef(null);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  useEffect(() => {
    scrollCheck();
    window.addEventListener("resize", scrollCheck);
  }, []);

  return (
    <div className="playlist">
      <div className="buttons" ref={scrl} onScroll={scrollCheck}>
        <button
          disabled={scrollX <= 0}
          onClick={() => slide(-100)}
          className="scroll left"
        >
          {"<"}
        </button>
        <div className="list">
          {playlist.map((item, index) => (
            <button
              onClick={() => {
                setContext({ ...context, nowPlaying: index });
              }}
              className={`item ${index === nowPlaying ? "playing" : ""}`}
              key={item.name + index}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button
          disabled={scrolEnd}
          onClick={() => slide(+100)}
          className="scroll right"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
