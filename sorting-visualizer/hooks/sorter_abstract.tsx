import { Dispatch, SetStateAction } from "react";
export interface SortVisualizer {
  (): {
    sortAlgorithms: SortAlgorithm[];
    currentSortAlgorithm: SortAlgorithm;
    setSortAlgorithm: Dispatch<SetStateAction<SortAlgorithm>>;
    play(): Promise<void>;
    stop(): void;
    reset(): void;
    changeSize(newSize: number): void;
    changeSortAlgorithm(newSortAlgorithm: SortAlgorithm): void;
    getName(): string;
    getDescription(): string;
    getComplexity(): string;
    getArray(): Item[];
  };
}

export interface SortAlgorithm {
  info: AlgorithmInfo;
  itemArray: Item[];
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
