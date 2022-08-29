import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useBubbleSort: () => SortAlgorithm = () => {
  const { itemArray, swapItem, isStop, setIsStop, updateColor, updateSize } =
    useContext(ArrayCtx);
  const itemArrayRef = useRef(itemArray);
  const isStopRef = useRef(isStop);

  const info = {
    name: "Bubble Sort",
    description:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
    complexity: {
      bestCase: "O(n)",
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
