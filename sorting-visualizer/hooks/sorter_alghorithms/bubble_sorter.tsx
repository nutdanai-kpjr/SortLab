import { Dispatch, SetStateAction } from "react";
import { COLORS } from "../../styles/color";
import { ISorter } from "./sorter";

export const useBubbleSorter: ISorter = ({
  numArray,
  getIsRunning,
  setIsRunning,
  changeColor,
  swap,
}: {
  numArray: number[];
  getIsRunning: () => boolean;
  swap: (arr: number[], a: number, b: number) => Promise<void>;
  changeColor: (indexs: number[], color: string) => Promise<void>;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}) => {
  const name = "Bubble Sort";
  const handleSort = async () => {
    console.log("array before sort", numArray);
    setIsRunning(true);
    console.log("sorter bubble sort");

    //sort the array of numbers
    let arr = [...numArray];

    // bubble sort algorithm
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        console.log(getIsRunning());
        // if (!isRunning) {
        //   return;
        // }
        await changeColor([j, j + 1], COLORS.WARNING);
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
        }
        await changeColor([j, j + 1], COLORS.PRIMARY);
      }
    }
    setIsRunning(false);
  };

  return { handleSort, name };
};
