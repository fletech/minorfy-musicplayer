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
      <div className={`${libraryStatus ? "logo logo-transform" : "logo"}`}>
        <img src="/images/cassette.svg" alt="cassette-logo" />
        <h3>minorfy</h3>
      </div>
      <div className="library-button">
        <button
          onClick={toggleLibraryHanlder}
          className={`${libraryStatus ? "button-on" : "button"}`}
        >
          <p>{!libraryStatus ? "Library" : "Close"}</p>
          <Icon icon={faMusic} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
