import React from "react";

// Source Tabler Icons: https://tablericons.com/
const IconMenuBurger = ({ onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-burger"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 15h16a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
        <path d="M12 4c3.783 0 6.953 2.133 7.786 5h-15.572c.833 -2.867 4.003 -5 7.786 -5z" />
        <path d="M5 12h14" />
      </svg>
    </button>
  );
};

export default IconMenuBurger;
