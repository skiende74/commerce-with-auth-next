"use client";
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  title?: string;
  body?: string;
  onClose?: () => void;
  children?: ReactNode;
  isOpen: boolean;
}

export function openModal() {
  return { open: (document.querySelector("#modal > .modal") as HTMLDialogElement).showModal };
}

function Modal({ title, body, onClose, children, isOpen }: Props) {
  useEffect(() => {
    (document.querySelector("#modal .modal") as HTMLDialogElement).showModal();
  }, []);

  return createPortal(
    isOpen && (
      <dialog className="modal">
        <div className="modal-box">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          {body && <p className="py-4">{body}</p>}
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={onClose ?? (() => {})}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    ),
    document.querySelector("#modal")!
  );
}

export default Modal;
