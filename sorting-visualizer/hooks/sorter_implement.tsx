import { useContext, useState } from "react";
import { ArrayCtx } from "../context/arrayContext";
import { SortAlgorithm, SortVisualizer } from "./sorter_abstract";
import { useBubbleSort } from "./sorter_algo/bubble_sort";
import { useHeapSort } from "./sorter_algo/heap_sort";
import { useInsertionSort } from "./sorter_algo/insertion_sort";
import { useMergeSort } from "./sorter_algo/merge_sort";
import { useQuickSort } from "./sorter_algo/quick_sort";
import { useSelectionSort } from "./sorter_algo/selection_sort";
import { useShellSort } from "./sorter_algo/shell_sort";
import { AudioType, useSorterAudio } from "./sorter_audio";

export const useSortVisualizer: SortVisualizer = () => {
  const sortAlgorithms: SortAlgorithm[] = [
    useBubbleSort(),
    useSelectionSort(),
    useInsertionSort(),
    useMergeSort(),
    useQuickSort(),
    useHeapSort(),
    useShellSort(),
  ];
  const [currentSortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm>(
    sortAlgorithms[0]
  );

  const { sort, info } = currentSortAlgorithm;
  const {
    animate,
    speed,
    setSpeed,
    itemArray,
    updateSize,
    isStopRef,
    setIsStop,
    audioPlayer,
  } = useContext(ArrayCtx);
  const play = async () => {
    // console.log("SortViz Fx ", itemArray.length);
    setIsStop(false);

    await sort();
    await animate(1000);
    if (isStopRef.current) return;

    audioPlayer.playAudio(AudioType.Sorted);

    // setIsProcessing(false);
  };
  const stop = () => {
    setIsStop(true);
  };
  const reset = () => {
    updateSize(itemArray.length);
  };

  const toggleAudio = () => {
    audioPlayer.toggleAudio();
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
  const getIsAudioOn = () => audioPlayer.isAudioOn;
  // useEffect(() => {
  //   // console.log("SorterImplement: itemArray changed", itemArray.length);
  // }, [itemArray]);

  return {
    sortAlgorithms,
    currentSortAlgorithm,
    setSortAlgorithm,
    play,
    stop,
    reset,
    toggleAudio,
    changeSize,
    changeSpeed,
    changeSortAlgorithm,
    getName,
    getDescription,
    getComplexity,
    getSpeed,
    getArray,
    getIsAudioOn,
  };
};
