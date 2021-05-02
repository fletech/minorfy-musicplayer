import React, { useState, useRef, useEffect } from "react";

//Import Style
import "./styles/app.scss";
//Import components
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Footer from "./components/Footer";

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
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [volumeInput, setVolumeInput] = useState(0.3);
  const [volumeValue, setVolumeValue] = useState(volumeInput);

  //Handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = isNaN(e.target.duration) ? 0 : e.target.duration;
    //calculate current time in percentage:
    const roundedCurrent = Math.ceil(current);
    const roundedDuration = Math.ceil(duration);
    const animation = Math.ceil((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
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
    }
  };

  //USE EFFECT
  useEffect(() => {
    let title = isPlaying
      ? `${currentSong.name}-${currentSong.artist}`
      : `minorfy - ${currentSong.name}`;
    document.title = title;
  }, [isPlaying, currentSong]);

  return (
    <div className="App" onClick={closeLibraryHandler}>
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
        volumeInput={volumeInput}
        setVolumeInput={setVolumeInput}
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
      />

      <audio
        ref={audioRef}
        volume={volumeValue}
        onVolumeChange={() => setVolumeValue(volumeInput)}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        onEnded={endedSongHandler}
      ></audio>
      <Footer libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
