// utils/types.ts
export interface BehavioralElement {
    symbol: string;
    row: number;
    column: number;
    specificScenario?: null | string;
    boxColor: string;
    firstLetterColor: string;
    secondLetterColor?: string;
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
    deceptionRatingScalePoints: number;
    deceptionTimeframe: string;
  }
  