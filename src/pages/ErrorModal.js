// components/ErrorModal.jsx
import React from "react";

const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
      <p className="text-black">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

export default ErrorModal;
