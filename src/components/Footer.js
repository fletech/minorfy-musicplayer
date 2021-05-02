import React from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faReact,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="author-info">
        <p>
          © website built on React{" "}
          <a
            href="https://reactjs.org/docs/getting-started.html"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon={faReact} spin color={"dodgerblue"} style={{}} />{" "}
          </a>
          by{" "}
          <a
            href="https://www.linkedin.com/in/facundo-garcia-ar/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Facundo Garcia</span>
          </a>{" "}
          as a demo.
        </p>
        <div className="social-network">
          <a href="https://github.com/fletech" target="_blank" rel="noreferrer">
            <Icon icon={faGithub} />
          </a>

          <a
            href="https://www.linkedin.com/in/facundo-garcia-ar/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
