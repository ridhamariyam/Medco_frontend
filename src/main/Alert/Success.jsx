import React from 'react';

const SuccessModal = ({ isOpen, onClose, message }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white h-500 w-900 p-4 shadow-md rounded-md text-center">
          <p className="text-green-600">{message}</p>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default SuccessModal;
