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
          <h3>Confirm your action!</h3>
        </header>
        <p>
          Yup, any old excuse to test a modal. This is a pretty simple one, but
          it's mine!
        </p>
        <footer>
          <button className="secondary" onClick={handleClose}>
            Cancel
          </button>
          <button onClick={handleClose}>Confirm</button>
        </footer>
      </article>
    </dialog>
  );
}
