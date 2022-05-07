import Player from "./components/Player/Player";
import "./App.css";
import React, { useState } from "react";
import defaultPlaylist from "./constants/playlist.json";
import { Context } from "./utils/context";

function App() {
  const [context, setContext] = useState({
    playlist: defaultPlaylist,
    playing: true,
    repeat: false,
    nowPlaying: 0,
  });

  return (
    <Context.Provider value={[context, setContext]}>
      <div className="App">
        <Player />
      </div>
    </Context.Provider>
  );
}

export default App;
