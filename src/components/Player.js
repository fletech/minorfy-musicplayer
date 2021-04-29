import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faAngleLeft,
  faAngleRight,
  faPauseCircle,
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
      audioRef.current.pause();
      await setIsPlaying(!isPlaying);
    } else {
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

  //Use Effect
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

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
        <p></p>
      </div>
      <div className="play-control">
        <Icon
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <Icon
          className="play"
          size="2x"
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          onClick={playSongHandler}
        />
        <Icon
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;