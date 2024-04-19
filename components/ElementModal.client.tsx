import React, { useEffect, useState, FC } from 'react';
import { Element } from '../types/elementTypes'; // Ensure this path is correct
import * as BTOEData from '../BTOE.json';

interface ElementModalProps {
  element: Element;
  onClose: () => void;
}

// Typing for the props of ElementRelationCard
interface ElementRelationCardProps {
  element: Element;
  relationType: string;
}

const ElementRelationCard: FC<ElementRelationCardProps> = ({ element, relationType }) => (
  <div className="p-4 border rounded shadow-sm m-2">
    <h3 className="text-lg font-bold">{element.symbol} - {element.name}</h3>
    <p>Relation: {relationType}</p>
    <p>{element.name || "No additional information provided."}</p>
  </div>
);

interface PositionedElement extends Element {
  angle: number;
  x: number; // Add this line
  y: number; // Add this line
}

const calculatePositions = (elements: Element[], radius: number): PositionedElement[] => {
  return elements.map((element, index, array) => {
    const angle = (index / array.length) * 2 * Math.PI; // distribute elements around the circle
    return {
      ...element,
      angle: angle,
      x: 100 + radius * Math.cos(angle), // 100 is the assumed center x
      y: 100 + radius * Math.sin(angle), // 100 is the assumed center y
    };
  });
};


const ElementModal: FC<ElementModalProps> = ({ element, onClose }) => {
  const [animation, setAnimation] = useState<string>('modal-enter');
  const [activeTab, setActiveTab] = useState<string>('details');

  // Function to find related elements
  function findRelatedElements(element: Element, elements: Element[]): Element[] {
    const symbol = element.symbol;
    return elements.filter((el: Element) =>
      el.confirmingGestures.includes(symbol) ||
      el.amplifyingGestures.includes(symbol) ||
      el.conflictingBehaviors.includes(symbol)
    );
  }
  const transformedElements = BTOEData.BehavioralTableOfElements.map(element => ({
    ...element,
    microphysiological: Array.isArray(element.microphysiological) 
       ? element.microphysiological.join(', ') 
       : element.microphysiological, // If it's not an array, just use the value as is
   }));

   const elements: Element[] = transformedElements

  const relatedElements = findRelatedElements(element, elements);

  const handleClose = () => {
    setAnimation('modal-exit');
    setTimeout(() => {
      onClose();
    }, 500); // Timing should match the duration of exitAnimation
  };

  useEffect(() => {
    setAnimation('modal-enter');
  }, [element]);

  const handleTabChange = (newTab: string) => {
    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  };

  return (
    

    <div className={`fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center ${animation}`}>
      
      <div className="rounded-lg text-black mr-20" style={{ backgroundColor: element.boxColor }}>
        <div className="flex flex-col items-center text-center p-20 space-y-12 space-x-4">
          <span className="text-5xl font-bold" style={{ color: element.firstLetterColor }}>
            {element.symbol}
          </span>
          <span className="text-4xl font-bold mt-10 mb-10" style={{ color: element.secondLetterColor ?? 'inherit' }}>
            {element.name}
          </span>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex justify-between space-x-40 w-full text-2xl">
              <span className="">{element.confirmingGestures.join(', ')}</span>
              <span className="">{element.gestureType}</span>
            </div>
            <div className="flex justify-between space-x-100 w-full text-2xl">
              <span className="">{element.amplifyingGestures.join(', ')}</span>
              <span className="">{element.conflictingBehaviors.join(', ')}</span>
            </div>
            <div className="flex justify-between space-x-100 w-full text-2xl">
            <span className="">{element.microphysiological || 'None'}</span>
            <span className="">{element.bodyRegion}</span>
            </div>
            
            <span className="text-7xl mt-20 pt-20 pb-10">{element.deceptionRatingScalePoints}</span>
            
          </div>
          <button
            onClick={handleClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300 ease-in-out mb-20"
          >
            Close
          </button>
          <span className="uppercase mt-20 ml-50 align-right">{element.deceptionTimeframe}</span>
        </div>
        
      </div>
      <div className="w-3/5 bg-white p-5 overflow-y-auto more-info w-3/5 modal-content rounded-lg">
        
          <div className="tabs">
          <button className={`${activeTab === 'details' ? 'active' : ''}`} onClick={() => handleTabChange('details')}>
  Details
</button>
<button className={`${activeTab === 'more' ? 'active' : ''}`} onClick={() => handleTabChange('more')}>
  Relations
</button>
<button className={`${activeTab === 'interaction' ? 'active' : ''}`} onClick={() => handleTabChange('interaction')}>
  Map
</button>

            {/* Add more tabs as needed */}
          </div>
          {activeTab === 'details' && (
            <div>
              {<div className="flex flex-col space-y-2">
    <div className='flex flex-col items-start space-y-2 break-words'>
    <div className="details">
    <div>
        <span className="symbol">Symbol: {element.symbol}</span>
        <span className="row">Row: {element.row}</span>
        <span className="column">Column: {element.column}</span>
        <span className="specific-scenario">Specific Scenario: {element.specificScenario || 'None'}</span>
        <span className="box-color" style={{ color: 'black' }}>Box Color: {element.boxColor}</span>
        <span className="first-letter-color" style={{ color: element.firstLetterColor }}>First Letter Color: {element.firstLetterColor}</span>
        <span className="second-letter-color" style={{ color: element.secondLetterColor || '#000000' }}>
            Second Letter Color: {element.secondLetterColor || 'None'}
        </span>
        <span className="third-letter-color" style={{ color: element.thirdLetterColor || '#000000' }}>
            Third Letter Color: {element.thirdLetterColor || 'None'}
        </span>
    </div>
    <div>
        <span className="name">Name: {element.name}</span>
        <span className="confirming-gestures">Confirming Gestures: {element.confirmingGestures.join(', ')}</span>
        <span className="amplifying-gestures">Amplifying Gestures: {element.amplifyingGestures.join(', ')}</span>
        <span className="microphysiological">Microphysiological: {element.microphysiological || 'None'}</span>
        <span className="variable-factors">Variable Factors: {element.variableFactors}</span>
        <span className="cultural-prevalence">Cultural Prevalence: {element.culturalPrevalence}</span>
        <span className="sexual-propensity">Sexual Propensity: {element.sexualPropensity}</span>
        <span className="gesture-type">Gesture Type: {element.gestureType}</span>
        <span className="conflicting-behaviors">Conflicting Behaviors: {element.conflictingBehaviors.join(', ')}</span>
        <span className="body-region">Body Region: {element.bodyRegion}</span>
        <span className="deception-rating-scale-points">Deception Rating Scale Points: {element.deceptionRatingScalePoints}</span>
        <span className="deception-timeframe">Deception Timeframe: {element.deceptionTimeframe}</span>
    </div>
</div>


            </div>
          </div>}
            </div>
          )}
          {activeTab === 'more' && (
          <div className="w-full p-5 content">
            {relatedElements.length > 0 ? relatedElements.map((relElement) => {
              const relationType = [
                relElement.confirmingGestures.includes(element.symbol) && "Confirming Gesture",
                relElement.amplifyingGestures.includes(element.symbol) && "Amplifying Gesture",
                relElement.conflictingBehaviors.includes(element.symbol) && "Conflicting Behavior"
              ].filter(Boolean).join(", ");
              
              return <ElementRelationCard key={relElement.symbol} element={relElement} relationType={relationType} />;
            }) : <p>No related elements found.</p>}
          </div>
        )}
        {activeTab === 'interaction' && (
  <div className="w-full h-full">
    {/* <h3 className="text-lg font-bold">Interaction Map</h3> */}
    <div className='mt-20 center'>
    <svg className="w-full h-full" viewBox="0 0 400 400">
      <circle cx="100" cy="100" r="20" fill="red"/>
      <text x="100" y="100" fill="black" textAnchor="middle" fontSize="10">{element.symbol}</text>
      {calculatePositions(relatedElements, 70).map((el, index) => (
        <React.Fragment key={index}>
          {/* <line x1="100" y1="100" x2={el.x} y2={el.y} stroke="#000000" strokeWidth="2"/> */}
          <circle cx={el.x} cy={el.y} r="15" fill="skyblue"/>
          <text x={el.x} y={el.y} fill="black" textAnchor="middle" fontSize="8">{el.symbol}</text>
        </React.Fragment>
      ))}
    </svg>
    </div>
  </div>
)}

        
        </div>
        <div>
      
    </div>
        
    </div>
  );
};

export default ElementModal;
