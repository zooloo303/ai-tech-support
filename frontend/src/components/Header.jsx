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
    <>
      <header className="container-fluid" {...props}>
        <nav>
          <ul>
            <button onClick={() => setShowSidebar(!showSidebar)}>Menu</button>
          </ul>
          <ul>
            <li>
              <strong>zooloo.ai - cloda</strong>
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
    </>
  );
};

export default Header;
