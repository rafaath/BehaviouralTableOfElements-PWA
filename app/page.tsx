"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import * as BTOEData from '../BTOE.json'; // Make sure the path to the JSON data is correct
import { Element } from '../types/elementTypes'; // Correct path to your types

const ElementModal = dynamic(() => import('../components/ElementModal.client'), {
  ssr: false
});

const Home: NextPage = () => {

  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const transformedElements = BTOEData.BehavioralTableOfElements.map(element => ({
  ...element,
  microphysiological: Array.isArray(element.microphysiological) 
     ? element.microphysiological.join(', ') 
     : element.microphysiological, // If it's not an array, just use the value as is
 }));


const elements: Element[] = transformedElements

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <Head>
        <title>Behavioral Table of Elements</title>
        <meta name="description" content="A grid layout displaying behavioral elements like a periodic table." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div><h1 className='text-center text-2xl'>Behavioral Table Of Elements</h1></div> */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-1">
        {elements.map((element: Element) => (
          <div
            key={element.symbol}
            className="p-2 border rounded shadow-sm cursor-pointer"
            style={{
              gridColumnStart: element.column,
              gridRowStart: element.row,
              backgroundColor: element.boxColor,
            }}
            onClick={() => setSelectedElement(element)}
          >
            <h2 className="text-lg font-bold" style={{ color: element.firstLetterColor }}>{element.symbol}</h2>
            <p className='text-black'>{element.name}</p>
          </div>
        ))}
      </div>

      {selectedElement && (
        <ElementModal
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

export default Home;
