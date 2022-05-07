import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";
import "./Playlist.css";

export default function Playlist() {
  const [context, setContext] = useContext(Context);
  const { playlist, playing, repeat, nowPlaying } = context;

  useEffect(() => {}, [nowPlaying]);

  const pausePlay = (play) => {
    console.log("playing", play);
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
    <div className="playlist">
      <div className="controls">
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
          className={repeat ? "repeat" : "no-repeat"}
        >
          repeat: {repeat ? " ON" : " OFF"}
        </button>
        <button onClick={suffle}>suffle</button>
      </div>
      <ul>
        {playlist.map((item, index) => (
          <li
            onClick={() => {
              setContext({ ...context, nowPlaying: index });
            }}
            className={index === nowPlaying ? "playing" : ""}
            key={item.name}
          >
            Video :#{index} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
