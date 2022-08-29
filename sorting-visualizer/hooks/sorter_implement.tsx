import { useContext, useEffect, useState } from "react";
import { ArrayCtx } from "../context/arrayContext";
import { SortAlgorithm, SortVisualizer } from "./sorter_abstract";
import { useBubbleSort } from "./sorter_algo/bubble_sort";

export const useSortVisualizer: SortVisualizer = () => {
  const sortAlgorithms: SortAlgorithm[] = [useBubbleSort()];
  const [currentSortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm>(
    sortAlgorithms[0]
  );

  const { sort, info } = currentSortAlgorithm;
  const { itemArray, updateSize } = useContext(ArrayCtx);
  const play = async () => {
    console.log("SortViz Fx ", itemArray.length);
    await sort();
  };
  const stop = () => {};
  const reset = () => {};
  const changeSize = async (newSize: number) => {
    updateSize(newSize);
  };
  const changeSortAlgorithm = (newSortAlgorithm: SortAlgorithm) => {};
  const getName = () => info.name;
  const getDescription = () => info.description;
  const getComplexity = () => info.complexity.worstCase;
  const getArray = () => itemArray;
  useEffect(() => {
    // console.log("SorterImplement: itemArray changed", itemArray.length);
  }, [itemArray]);

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
