export interface Element {
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
  