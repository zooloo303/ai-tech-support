import React from "react";
import IconHome from "../icons/IconHome";
import IconBot from "../icons/IconBot";
import IconNotes from "../icons/IconNotes";
import IconClick from "../icons/IconClick";
import IconProfile from "../icons/IconProfile";
//Styles
import "../styles/Home.css";

const Sidebar = ({ show }) => {
  return (
    <div className={show ? "side-panel active" : "side-panel"}>
      <ul>
        <li>
          <a href="/">
            <IconHome />
            Home
          </a>
        </li>
        <li>
          <a href="/ChatPage">
            <IconBot />
            Chat
          </a>
        </li>
        <li>
          <a href="/NotesPage">
            <IconNotes />
            Notes
          </a>
        </li>
        <li>
          <a href="/ClicksPage">
            <IconClick />
            Clickers
          </a>
        </li>
        <li>
          <a href="/ProfilePage">
            <IconProfile />
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
