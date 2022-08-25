import { useState } from "react";
import { COLORS } from "../styles/color";
import { ISorterBuilder } from "./sorter_alghorithms/sorter";

export const useSorterBuilder: ISorterBuilder = () => {
  const [numArray, setNumArray] = useState([25, 12, 40, 20, 1, 2, 3, 4, 5, 7]);
  const [colorArray, setColorArray] = useState(
    Array<string>(numArray.length).fill(COLORS.PRIMARY)
  );

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

  const changeArray = async (newArr: number[]) => {
    setNumArray(newArr);
    await sleep(200);
  };

  const swap = async (arr: number[], a: number, b: number) => {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    console.log("swap");
    await changeArray([...arr]);
    await changeColor([b], COLORS.SUCCESS);
  };

  return {
    numArray,
    setNumArray,
    colorArray,
    setColorArray,
    changeColor,
    changeArray,
    sleep,
    swap,
  };
};
