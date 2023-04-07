import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay z-50 fixed flex flex-col items-center justify-center inset-0 bg-black bg-opacity-75 transition-opacity">
      <div className="modal relative pt-20 px-12 pb-12 bg-white max-w-[300px]">
        {children}
        <button
          onClick={onClose}
          className="btn absolute top-5 right-5"
          aria-label="Close Modal"
        >
          X
        </button>
      </div>
    </div>
  );
};
