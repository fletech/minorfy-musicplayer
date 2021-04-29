import React from "react";
//import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  const songSelectHandler = async () => {
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
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
    await setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.play();
  };
  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img
        className="album-image-container"
        src={song.cover}
        alt={song.artist}
      />
      <div className="song-info">
        <h3>{song.name}</h3>
        <i>{song.artist}</i>
      </div>
    </div>
  );
};

export default LibrarySong;
