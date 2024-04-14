import React from 'react';

interface Props {
  element: any; // You should replace 'any' with a more specific type matching your data structure
  onClose: () => void;
}

const ElementDetailsModal: React.FC<Props> = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        <h2 className="text-lg font-bold">{element.name} ({element.symbol})</h2>
        <div className="mt-2">
          <p>Gesture Type: {element.gestureType}</p>
          <p>Body Region: {element.bodyRegion}</p>
          {/* Add more element details here */}
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ElementDetailsModal;
