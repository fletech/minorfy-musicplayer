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
      <h2>Library</h2>
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
