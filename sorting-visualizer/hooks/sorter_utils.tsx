import { useState } from "react";
import { COLORS } from "../styles/color";
import { useBubbleSorter } from "./sorter_alghorithms/bubble_sorter";
import { useSelectionSorter } from "./sorter_alghorithms/selection_sorter";
import { IBasicBuilder } from "./sorter_alghorithms/sorter";
import { useSorterBuilder } from "./sorter_builder";
export const useSorterUtils = () => {
  const sorterBuilder = useSorterBuilder;
  const {
    numArray,
    colorArray,
    changeSize,
    changeColor,
    changeArray,
    swap,
    getIsRunning,
    setIsRunning,
  } = sorterBuilder();
  const basicBuilder: IBasicBuilder = {
    numArray,
    changeColor,
    swap,
    getIsRunning,
    setIsRunning,
  };
  ``;
  const sorterList = [
    useBubbleSorter(basicBuilder),
    useSelectionSorter(basicBuilder),
  ];
  const [sorter, setSorter] = useState(sorterList[0]);

  const setSorterByName = (name: string) => {
    const newSorter =
      sorterList.find((sorter) => sorter.name === name) || sorterList[0];
    setSorter(newSorter);
  };
  // const [sorterName, setSorterName] = useState("Bubble");

  const getSorterNameList: () => string[] = () => {
    return sorterList.map((sorter) => sorter.name);
  };
  // const sorterList = ["Bubble", "Selection"];

  const { handleSort, name } = sorter;
  const handleSorterChange = (sorterName: string) => {
    setSorterByName(sorterName);
  };

  const handleShuffle = async () => {
    console.log("shuffle");
    let arr = [...numArray];
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * arr.length);
      await swap(arr, i, j);
      await changeColor([j], COLORS.PRIMARY);
    }
  };

  const handleGenerate = async () => {
    console.log("generate");
    let arr = [];
    for (let i = 0; i < numArray.length; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    await changeArray(arr, { resetColor: true });
  };
  const handleStop = async () => {
    setIsRunning(false);
  };

  const handlePlay = async () => {
    await handleSort();
  };
  return {
    handleShuffle,
    handleGenerate,
    handleStop,
    getSorterNameList,
    changeSize,
    numArray,
    colorArray,
    handlePlay,
    handleSorterChange,
    name,
    setIsRunning,
    getIsRunning,
  };
};
