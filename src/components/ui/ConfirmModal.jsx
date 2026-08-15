import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm p-6 space-y-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-gray-400 text-sm">{message}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-300 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-500 shadow-lg shadow-red-500/30"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
