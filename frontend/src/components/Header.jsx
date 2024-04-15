import React from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";
import { ModalProvider } from "../contexts/ModalContext";
import ModalButton from "./ModalButton";
import Modal from "./Modal";

const Header = (props) => {
  return (
    <header className="container" {...props}>
      <nav>
        <ul>
          <li>
            <strong>
              <ColorSchemeSwitcher className="contrast" />
            </strong>
            <strong>zooloo.ai - cloda</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" className="contrast">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
