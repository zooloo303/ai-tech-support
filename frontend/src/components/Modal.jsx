import React from "react";
import { useModal } from "../contexts/ModalContext";

export default function Modal(props) {
  const { modalIsOpen, handleClose } = useModal();

  const handleClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
      handleClose(event);
    }
  };

  return (
    <dialog onClick={handleClickOverlay} open={modalIsOpen} {...props}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={handleClose}></button>
          <h3>You pressed the button!</h3>
        </header>
        <p>
          Nice, it was looking a little lonely, better now...
          <a href="mailto:zooloo@me.com">zooloo@me.com</a>
        </p>
        <footer>
          <button onClick={handleClose}>Okay</button>
        </footer>
      </article>
    </dialog>
  );
}
