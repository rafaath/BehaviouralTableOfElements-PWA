import { Element } from '../types/elementTypes'; // Ensure this path is correct

interface ElementModalProps {
  element: Element;
  onClose: () => void;
}

const ElementModal: React.FC<ElementModalProps> = ({ element, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="rounded-lg text-black" style={{ backgroundColor: element.boxColor }}>
        <div className="flex flex-col items-center text-center p-20 space-y-4">
          <span className="text-5xl font-bold" style={{ color: element.firstLetterColor }}>
            {element.symbol}
          </span>
          <span className="text-2xl uppercase" style={{ color: element.secondLetterColor ?? 'inherit' }}>
            {element.name}
          </span>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex justify-between space-x-40 w-full">
              <span className="uppercase">{element.confirmingGestures.join(', ')}</span>
              <span className="uppercase">{element.gestureType}</span>
            </div>
            <div className="flex justify-between space-x-100 w-full">
              <span className="uppercase">{element.amplifyingGestures.join(', ')}</span>
              <span className="uppercase">{element.conflictingBehaviors.join(', ')}</span>
            </div>
            <div className="flex justify-between space-x-100 w-full">
            <span className="uppercase">{element.microphysiological || 'None'}</span>
            <span className="uppercase">{element.bodyRegion}</span>
            </div>
            <span className="text-6xl">{element.deceptionRatingScalePoints}</span>
            
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300 ease-in-out mb-20"
          >
            Close
          </button>
          <span className="uppercase">{element.deceptionTimeframe}</span>
        </div>
      </div>
    </div>
  );
};

export default ElementModal;
