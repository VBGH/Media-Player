import { useContext } from "react";
import { Context } from "../../utils/context";
import "./Controls.css";

export default function Controls() {
  const [context, setContext] = useContext(Context);
  const { playlist, playing, repeat, nowPlaying } = context;

  const pausePlay = (play) => {
    if (play && !nowPlaying) {
      return setContext({ ...context, playing: play, nowPlaying: 0 });
    }
    setContext({ ...context, playing: play });
  };

  const toggleRepeat = () => {
    setContext({ ...context, repeat: !repeat });
  };

  const prev = () => {
    setContext({ ...context, nowPlaying: nowPlaying - 1 });
  };

  const next = () => {
    setContext({ ...context, nowPlaying: nowPlaying + 1 });
  };

  const suffle = () => {
    const newPlaylist = [...playlist.map((item) => ({ ...item }))];

    let currentIndex = newPlaylist.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newPlaylist[currentIndex], newPlaylist[randomIndex]] = [
        newPlaylist[randomIndex],
        newPlaylist[currentIndex],
      ];
    }

    setContext({
      ...context,
      playlist: newPlaylist,
      nowPlaying: newPlaylist.findIndex(
        (item) => item.name === playlist[nowPlaying].name
      ),
    });
  };

  return (
    <div className="controls">
      <button className="big" onClick={suffle}>
        suffle
      </button>

      <button disabled={nowPlaying === 0} onClick={prev}>
        {"<="}
      </button>
      {playing ? (
        <button onClick={() => pausePlay(false)}>{"||"}</button>
      ) : (
        <button onClick={() => pausePlay(true)}>{">"}</button>
      )}
      <button disabled={nowPlaying >= playlist.length - 1} onClick={next}>
        {"=>"}
      </button>
      <button
        onClick={toggleRepeat}
        className={`big ${repeat ? "repeat" : "no-repeat"}`}
      >
        repeat: {repeat ? " ON" : " OFF"}
      </button>
    </div>
  );
}
