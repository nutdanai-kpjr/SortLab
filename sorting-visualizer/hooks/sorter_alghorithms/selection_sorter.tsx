import { COLORS } from "../../styles/color";
import { ISorter } from "./sorter";

export const useSelectionSorter: ISorter = ({
  numArray,
  changeColor,
  swap,
}: {
  numArray: number[];
  swap: (arr: number[], a: number, b: number) => Promise<void>;
  changeColor: (indexs: number[], color: string) => Promise<void>;
}) => {
  const name = "Selection Sort";
  const handleSort = async () => {
    console.log("sorter selection sort");
    //sort the array of numbers
    let arr = [...numArray];
    // bubble sort algorithm
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        await changeColor([j, j + 1], COLORS.WARNING);
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
        }
        await changeColor([j, j + 1], COLORS.PRIMARY);
      }
    }
  };
  return { handleSort, name };
};
