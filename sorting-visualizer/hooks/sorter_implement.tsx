import { useContext, useEffect, useState } from "react";
import { ArrayCtx } from "../context/arrayContext";
import { SortAlgorithm, SortVisualizer } from "./sorter_abstract";
import { useBubbleSort } from "./sorter_algo/bubble_sort";
import { useInsertionSort } from "./sorter_algo/insertion_sort";
import { useSelectionSort } from "./sorter_algo/selection_sort";

export const useSortVisualizer: SortVisualizer = () => {
  const sortAlgorithms: SortAlgorithm[] = [
    useBubbleSort(),
    useSelectionSort(),
    useInsertionSort(),
  ];
  const [currentSortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm>(
    sortAlgorithms[0]
  );

  const { sort, info } = currentSortAlgorithm;
  const { speed, setSpeed, itemArray, updateSize, setIsStop } =
    useContext(ArrayCtx);
  const play = async () => {
    // console.log("SortViz Fx ", itemArray.length);

    await sort();
    // setIsProcessing(false);
  };
  const stop = () => {
    setIsStop(true);
    console.log("SortViz Fx stop");
  };
  const reset = () => {
    updateSize(itemArray.length);
  };
  const changeSize = async (newSize: number) => {
    updateSize(newSize);
  };
  const changeSpeed = async (newSpeed: number) => {
    setSpeed(newSpeed);
  };
  const changeSortAlgorithm = (newSortAlgorithmName: string) => {
    // find sortAlgorithm by Name
    const newSortAlgorithm = sortAlgorithms.find(
      (algo) => algo.info.name === newSortAlgorithmName
    );
    if (!newSortAlgorithm) {
      console.error("sort algorithm not found");
      return;
    }
    setSortAlgorithm(newSortAlgorithm);
  };

  const getName = () => info.name;
  const getDescription = () => info.description;
  const getComplexity = () => info.complexity;
  const getArray = () => itemArray;
  const getSpeed = () => speed;
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
    changeSpeed,
    changeSortAlgorithm,
    getName,
    getDescription,
    getComplexity,
    getSpeed,
    getArray,
  };
};
