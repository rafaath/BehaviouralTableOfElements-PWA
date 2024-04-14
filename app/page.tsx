import type { NextPage } from 'next';
import Head from 'next/head';
import * as BTOEData from '../BTOE.json';

// TypeScript interface for an element
interface Element {
  symbol: string;
  row: number;
  column: number;
  specificScenario: string | null;
  boxColor: string;
  firstLetterColor: string;
  secondLetterColor: string | null;
  thirdLetterColor?: string;
  name: string;
  confirmingGestures: string[];
  amplifyingGestures: string[];
  microphysiological: string;
  variableFactors: number;
  culturalPrevalence: string;
  sexualPropensity: string;
  gestureType: string;
  conflictingBehaviors: string[];
  bodyRegion: string;
  deceptionRatingScalePoints: string | number;
  deceptionTimeframe: string;
 }

// Example JSON data
const transformedElements = BTOEData.BehavioralTableOfElements.map(element => ({
  ...element,
  microphysiological: Array.isArray(element.microphysiological) 
     ? element.microphysiological.join(', ') 
     : element.microphysiological, // If it's not an array, just use the value as is
 }));
 
 const elements: Element[] = transformedElements;

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <Head>
        <title>Behavioral Table of Elements</title>
        <meta name="description" content="A grid layout displaying behavioral elements like a periodic table." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-4">
        {elements.map((element) => (
          <div
            key={element.symbol}
            style={{
              gridColumnStart: element.column,
              gridRowStart: element.row,
              backgroundColor: element.boxColor,
            }}
            className="p-3 border rounded shadow-sm"
          >
            <h2 className="text-lg font-bold" style={{ color: element.firstLetterColor }}>{element.symbol}</h2>
            <p className="text-black">{element.name}</p>
            {/* <p className="text-sm text-black">Region: {element.bodyRegion}</p>
            <p className="text-sm text-black">Confirming Gestures: {element.confirmingGestures}</p> */}
            {/* Additional details can be rendered here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
