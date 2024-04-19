import React from "react";
import { useState } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";
import { ModalProvider } from "../contexts/ModalContext";
import ModalButton from "../components/ModalButton";
import Modal from "../components/Modal";
import IconMenuBurger from "../icons/IconMenuBurger";
import Sidebar from "./Sidebar";
//Styles
import "../styles/Home.css";

const Header = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="container-fluid header">
      <header {...props}>
        <nav>
          <ul>
            <IconMenuBurger onClick={() => setShowSidebar(!showSidebar)} />
          </ul>
          <ul>
            <li>
              <strong>zooloo.me</strong>
            </li>
          </ul>
          <ul>
            <li>
              <strong>
                <ColorSchemeSwitcher className="contrast" />
              </strong>
            </li>
            <li>
              <ModalProvider>
                <ModalButton>About</ModalButton>
                <Modal />
              </ModalProvider>
            </li>
          </ul>
        </nav>
      </header>
      <Sidebar show={showSidebar} />
    </div>
  );
};

export default Header;
