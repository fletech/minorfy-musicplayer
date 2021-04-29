import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  //Handler
  const toggleLibraryHanlder = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <nav className="nav-bar">
      <div className="logo">
        <img src="/images/cassette.svg" alt="cassette-logo" />

        <h3>Me Lodics</h3>
      </div>
      <div className="library-button">
        <button onClick={toggleLibraryHanlder}>
          <p>Library</p>
          <Icon icon={faMusic} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
