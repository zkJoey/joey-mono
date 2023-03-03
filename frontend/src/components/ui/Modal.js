import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative bg-white p-4 max-w-sm mx-auto rounded shadow-lg">
        <button
          className="absolute top-0 right-0 m-4 p-2 rounded-full text-gray-500 hover:text-gray-800 focus:outline-none focus:ring"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="my-4">{children}</div>
        {/* add done button on left */}
        <div className="flex justify-end">
            <button
                className="bg-brand-500 hover:bg-brand-600 active:bg-brand-600 hover:disabled:bg-brand-500 focus:ring-1 ring-brand-800 text-white rounded-md font-medium whitespace-nowrap cursor-pointer  font-display duration-200 ease-out hover:scale-[1.02] disabled:shadow-none disabled:brightness-75  hover:disabled:scale-[1]  active:scale-95  outline-none px-4 py-1.5 text-base"
                onClick={onClose}
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
