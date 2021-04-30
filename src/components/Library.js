import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  libraryStatus,
}) => {
  const status = libraryStatus ? "" : "library-status";
  return (
    <div className={`library ${status}`}>
      <div className={`logo${!libraryStatus ? " logo-transform" : ""}`}>
        <img src="/images/cassette.svg" alt="cassette-logo" />
        <h3>minorfy</h3>
      </div>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              audioRef={audioRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              song={song}
              songs={songs}
              setSongs={setSongs}
              key={song.id}
              setCurrentSong={setCurrentSong}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
