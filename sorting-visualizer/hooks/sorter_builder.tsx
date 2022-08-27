import { useState } from "react";
import { COLORS } from "../styles/color";
import { ISorterBuilder } from "./sorter_alghorithms/sorter";

export const useSorterBuilder: ISorterBuilder = () => {
  const [numArray, setNumArray] = useState([25, 12, 40, 20, 1, 2, 3, 4, 5, 7]);
  const [colorArray, setColorArray] = useState(
    Array<string>(numArray.length).fill(COLORS.PRIMARY)
  );
  const [isRunning, setIsRunning] = useState(false);
  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const changeColor = async (indexs: number[], color: string) => {
    let colorArr = [...colorArray];
    indexs.forEach((i) => {
      colorArr[i] = color;
    });
    setColorArray(colorArr);
    await sleep(100);
  };

  const changeArray = async (
    newArr: number[],
    option: { resetColor?: boolean } = { resetColor: true }
  ) => {
    setNumArray(newArr);
    if (option.resetColor) {
      setColorArray(Array(newArr.length).fill(COLORS.PRIMARY));
    }
    await sleep(200);
  };

  const changeSize = async (newSize: number) => {
    //randomly generate new array of newSize length
    let arr = [];
    for (let i = 0; i < newSize; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    await changeArray(arr, { resetColor: true });
  };

  const swap = async (arr: number[], a: number, b: number) => {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    console.log("swap");
    await changeArray([...arr]);
    await changeColor([b], COLORS.SUCCESS);
  };

  const changeIsRunning = async (newIsRunning: boolean) => {
    setIsRunning(true);
  };
  const getIsRunning = () => isRunning;

  return {
    numArray,
    setNumArray,
    colorArray,
    setColorArray,
    isRunning,
    setIsRunning,
    getIsRunning,
    changeIsRunning,
    changeColor,
    changeArray,
    changeSize,
    sleep,
    swap,
  };
};
