import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Playlist from "../Playlist/Playlist";

import "./Player.css";

export default function Player() {
  return (
    <div className="player-container">
      <Playlist />
      <VideoPlayer />
    </div>
  );
}
