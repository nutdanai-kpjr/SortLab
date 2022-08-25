import { useState } from "react";
import { COLORS } from "../styles/color";
import { useBubbleSorter } from "./sorter_alghorithms/bubble_sorter";
import { IBasicBuilder } from "./sorter_alghorithms/sorter";
import { useSorterBuilder } from "./sorter_builder";
export const useSorterUtils = () => {
  const sorterBuilder = useSorterBuilder;
  const {
    numArray,
    colorArray,
    setColorArray,
    changeColor,
    changeArray,
    swap,
  } = sorterBuilder();
  const basicBuilder: IBasicBuilder = { numArray, changeColor, swap };
  const { handleSort } = useBubbleSorter(basicBuilder);
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
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    await changeArray(arr);
    setColorArray(Array(arr.length).fill(COLORS.PRIMARY));
  };

  return {
    handleShuffle,
    handleGenerate,
    numArray,
    colorArray,
    handleSort,
  };
};
