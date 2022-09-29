import { Dispatch, SetStateAction } from "react";
export interface SortVisualizer {
  (): {
    sortAlgorithms: SortAlgorithm[];
    currentSortAlgorithm: SortAlgorithm;
    getSpeed(): number;
    setSortAlgorithm: Dispatch<SetStateAction<SortAlgorithm>>;
    play(): Promise<void>;
    stop(): void;
    reset(): void;
    toggleAudio(): void;
    toggleExplainText(): void;
    changeSize(newSize: number): void;
    changeSpeed(newSpeed: number): void;
    changeSortAlgorithm(newSortAlgorithmName: string): void;
    getName(): string;
    getDescription(): string;
    getComplexity(): AlgorithmComplexity;
    getArray(): Item[];
    getIsAudioOn(): boolean;
    getIsShowExplainText(): boolean;
    getExplainText(): string;
  };
}

export interface SortAlgorithm {
  info: AlgorithmInfo;
  sort: () => Promise<void>;
}
export interface AlgorithmInfo {
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
}

export interface AlgorithmComplexity {
  bestCase: string;
  averageCase: string;
  worstCase: string;
}

export interface ItemArray {
  elements: Item[];
}

export interface Item {
  value: number;
  color: string;
}
