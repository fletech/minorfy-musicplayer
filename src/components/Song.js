import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img
        className="album-image-container"
        src={currentSong.cover}
        alt={currentSong.artist}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
