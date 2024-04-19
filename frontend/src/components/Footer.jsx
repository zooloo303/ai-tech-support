import React from "react";
//Styles
import "../styles/Home.css";

const Footer = (props) => {
  return (
    <div className="container-fluid footer">
      <footer {...props}>
        <small>
          I'm trying to build this with <a href="https://picocss.com">Pico</a> •{" "}
          <a href="https://github.com/picocss/examples/tree/master/v2-react-color-schemes-and-modal">
            Source code
          </a>
        </small>
      </footer>
    </div>
  );
};

export default Footer;
