import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";
import { randomColor } from "../utils";

export const useBubbleSort: () => SortAlgorithm = () => {
  const {
    itemArray,
    swapItem,
    isProcessing,
    setIsProcessing,
    updateColor,
    updateSize,
  } = useContext(ArrayCtx);
  const itemArrayRef = useRef(itemArray);

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
    // console.log("Bubble Sort: itemArray changed", itemArray.length);
    itemArrayRef.current = itemArray;
  }, [itemArray]);

  const sort = async () => {
    // console.log("BubbleFunction", itemArrayRef.current.length);
    let arr: Item[] = [...itemArrayRef.current];
    let sortedCount = 0;
    // await swapItem(0, 1);
    // await swapItem(1, 2);
    // await swapItem(2, 3);
    // await swapItem(3, 4);
    // await swapItem(4, 3);
    // await swapItem(3, 2);
    // await swapItem(2, 1);
    // await swapItem(1, 0);

    let newColor = randomColor();

    setIsProcessing(true);

    for (let i = 0; i < arr.length; i++) {
      // console.log(i);

      for (let j = 0; j < arr.length - i - 1; j++) {
        arr = [...itemArrayRef.current]; // refetch the array from context to avoid stale state
        let valueA = { ...arr[j] }.value;
        let valueB = { ...arr[j + 1] }.value;
        // if (!isRunning) {
        //   return;
        // }
        await updateColor([j, j + 1], COLORS.SECONDARY); // Comparing
        if (valueA > valueB) {
          console.log(valueA + ">" + valueB + " swap " + j + " to " + (j + 1));
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
