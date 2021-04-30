import React, { useState, useRef, useEffect } from "react";
//Import Style
import "./styles/app.scss";
//Import components
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";

import data from "./data/data";

function App() {
  //Select de <audio>
  const audioRef = useRef(null);

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [{ ...songInfo }, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  //Handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const durationEvent = e.target.duration;
    const duration = isNaN(durationEvent) ? 0 : e.target.duration;
    setSongInfo({ currentTime: current, duration });
  };

  const endedSongHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === songs.length - 1) {
      await setCurrentSong(songs[0]);
    } else {
      await setCurrentSong(songs[currentIndex + 1]);
    }
    setIsPlaying(true);
    audioRef.current.play();
  };

  const closeLibraryHandler = (e) => {
    e.stopPropagation();
    if (libraryStatus) {
      if (e.target.offsetParent === undefined) {
        return setLibraryStatus(false);
      }
      if (
        e.target.offsetParent !== null &&
        e.target.offsetParent.className !== "library "
      ) {
        setLibraryStatus(false);
      }
      console.log();
    }
  };

  const closeKeyLibraryHandler = (e) => {
    console.log(e.key);
    e.stopPropagation();
  };

  useEffect(() => {
    let title = isPlaying
      ? `${currentSong.name}-${currentSong.artist}`
      : `minorfy - ${currentSong.name}`;
    document.title = title;
  }, [isPlaying, currentSong]);
  return (
    <div
      className="App"
      onClick={closeLibraryHandler}
      onKeyPress={closeKeyLibraryHandler}
    >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        close
      />
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        onEnded={endedSongHandler}
      ></audio>
    </div>
  );
}

export default App;
