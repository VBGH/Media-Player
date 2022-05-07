import { useContext, useEffect, useRef } from "react";
import { Context } from "../../utils/context";
import Controls from "../Controls/Controls";
import "./VideoPlayer.css";

export default function VideoPlayer() {
  const [context, setContext] = useContext(Context);
  const videoRef = useRef(null);

  const { playlist, nowPlaying, repeat, playing } = context;
  const onPlay = () => {
    setContext({ ...context, playing: true });
  };
  const onPause = () => {
    setContext({ ...context, playing: false });
  };
  const onEnded = () => {
    if (!repeat && nowPlaying < playlist.length - 1)
      setContext({ ...context, nowPlaying: nowPlaying + 1 });
  };

  useEffect(() => {
    videoRef?.current?.load();
  }, [nowPlaying]);

  useEffect(() => {
    if (playing) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [playing]);

  return (
    <div className="containerVideo">
      <div className="video-container">
        <video
          className="video"
          ref={videoRef}
          autoPlay
          muted
          loop={repeat}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        >
          <source src={playlist[nowPlaying]?.src} type="video/webm" />
        </video>
      </div>
      <div className="controls-container">
        <Controls />
      </div>
    </div>
  );
}
