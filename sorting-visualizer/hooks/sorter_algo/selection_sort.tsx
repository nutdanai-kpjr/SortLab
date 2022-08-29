import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useSelectionSort: () => SortAlgorithm = () => {
  const { itemArray, swapItem, isStop, setIsStop, updateColor, updateSize } =
    useContext(ArrayCtx);
  const itemArrayRef = useRef(itemArray);
  const isStopRef = useRef(isStop);

  const info = {
    name: "Selection Sort",
    description:
      "Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array. One subarray is always sorted. Selection sort repeatedly selects the minimum element from the unsorted array and places it at the end of the sorted array.",
    complexity: {
      bestCase: "O(n^2)",
      averageCase: "O(n^2)",
      worstCase: "O(n^2)",
    },
  };
  useEffect(() => {
    itemArrayRef.current = itemArray;
  }, [itemArray]);
  useEffect(() => {
    isStopRef.current = isStop;
  }, [isStop]);

  const sort = async () => {
    // console.log("BubbleFunction", itemArrayRef.current.length);

    let arr: Item[] = [...itemArrayRef.current];

    for (let i = 0; i < arr.length; i++) {
      // console.log(i);

      for (let j = 0; j < arr.length - i - 1; j++) {
        let isStop = isStopRef.current;
        if (isStop) {
          //generate array of index from 0 to arr.length
          let indexArr = Array.from(Array(arr.length).keys());
          await updateColor(indexArr, COLORS.PRIMARY); //change back to original color

          setIsStop(false);
          return;
        }
        arr = [...itemArrayRef.current]; // refetch the array from context to avoid stale state

        let valueA = { ...arr[j] }.value;
        let valueB = { ...arr[j + 1] }.value;
        await updateColor([j, j + 1], COLORS.SECONDARY); // Comparing
        if (valueA > valueB) {
          // console.log(valueA + ">" + valueB + " swap " + j + " to " + (j + 1));
          await updateColor([j], COLORS.SUCCESS);
          await swapItem(j, j + 1); // swap j to j+1
        }
        await updateColor([j + 1], COLORS.SUCCESS); // Winner
        await updateColor([j], COLORS.PRIMARY); // Loser
      }
      await updateColor([0], COLORS.SUCCESS); //
    }
  };
  return { sort, info, itemArray, updateSize };
};
