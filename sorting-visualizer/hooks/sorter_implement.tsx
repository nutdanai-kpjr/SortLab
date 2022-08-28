import { useState } from "react";
import { SortAlgorithm, SortVisualizer } from "./sorter_abstract";
import { useBubbleSort } from "./sorter_algo/bubble_sort";

export const useSortVisualizer: SortVisualizer = () => {
  const sortAlgorithms: SortAlgorithm[] = [useBubbleSort()];
  const [currentSortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm>(
    sortAlgorithms[0]
  );
  const { sort, info, itemArray } = currentSortAlgorithm;
  const play = async () => {
    await sort();
  };
  const stop = () => {};
  const reset = () => {};
  const changeSize = (newSize: number) => {};
  const changeSortAlgorithm = (newSortAlgorithm: SortAlgorithm) => {};
  const getName = () => info.name;
  const getDescription = () => info.description;
  const getComplexity = () => info.complexity.worstCase;
  const getArray = () => itemArray;

  return {
    sortAlgorithms,
    currentSortAlgorithm,
    setSortAlgorithm,
    play,
    stop,
    reset,
    changeSize,
    changeSortAlgorithm,
    getName,
    getDescription,
    getComplexity,
    getArray,
  };
};
