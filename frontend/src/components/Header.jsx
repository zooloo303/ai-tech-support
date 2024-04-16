import React from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";
import { ModalProvider } from "../contexts/ModalContext";
import ModalButton from "../components/ModalButton";
import Modal from "../components/Modal";
import "../styles/Header.css";

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
            <ModalProvider>
              <ModalButton>About</ModalButton>
              <Modal />
            </ModalProvider>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
