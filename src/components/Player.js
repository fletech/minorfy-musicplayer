import React, { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStepBackward,
  faStepForward,
  faPauseCircle,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
//import { playAudio } from "../util";

const Player = ({
  setSongs,
  songs,
  audioRef,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  volumeInput,
  setVolumeInput,
}) => {
  //Functions
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Handlers
  const playSongHandler = async () => {
    if (isPlaying) {
      console.log(audioRef.current.volume);
      audioRef.current.pause();
      await setIsPlaying(!isPlaying);
    } else {
      console.log(audioRef.current.volume);
      audioRef.current.play();
      await setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[currentIndex - 1]);
        activeLibraryHandler(songs[currentIndex - 1]);
      }
      audioRef.current.play();
    }
    if (direction === "skip-forward") {
      if (currentIndex === songs.length - 1) {
        await setCurrentSong(songs[0]);
        activeLibraryHandler(songs[0]);
      } else {
        await setCurrentSong(songs[currentIndex + 1]);
        activeLibraryHandler(songs[currentIndex + 1]);
      }
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((s) => {
      if (s.id === nextPrev.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const changeVolumeHandler = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setVolumeInput(value);
  };
  const muteHandler = (activeInactive) => {
    if (activeInactive) {
      audioRef.current.volume = 0;
      setVolumeInput(0);
      setActiveVolume(false);
    } else {
      audioRef.current.volume = 0.3;
      setVolumeInput(0.3);
      setActiveVolume(true);
    }
  };

  //States

  const [activeVolume, setActiveVolume] = useState(true);

  //Style input VOLUME
  let volumeRounded = Math.round(volumeInput * 100);
  const styleVolumeInput = {
    transform: `translateX(${volumeRounded}%)`,
  };
  // Style input TIME
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const trackColor = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={trackColor}>
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
        <p></p>
      </div>
      <div className="play-control">
        <Icon
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back icon"
          size="2x"
          icon={faStepBackward}
        />
        <Icon
          className="play icon"
          size="2x"
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          onClick={playSongHandler}
        />
        <Icon
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
          className="skip-forward icon"
          size="2x"
          icon={faStepForward}
        />
      </div>
      <div className="volume-container">
        {!activeVolume ? (
          <Icon
            icon={faVolumeUp}
            className="icon-volume mute"
            onClick={() => muteHandler(activeVolume)}
          />
        ) : (
          <Icon
            icon={faVolumeMute}
            className="icon-volume mute"
            onClick={() => muteHandler(activeVolume)}
          />
        )}

        {activeVolume && (
          <div className="volume">
            <input
              className="volume-input"
              onChange={changeVolumeHandler}
              value={volumeInput}
              max="1"
              min="0"
              step="0.01"
              type="range"
            />
            <div className="animate-volume" style={styleVolumeInput}></div>
          </div>
        )}

        {activeVolume && <Icon icon={faVolumeUp} className="icon-volume" />}
      </div>
    </div>
  );
};

export default Player;
