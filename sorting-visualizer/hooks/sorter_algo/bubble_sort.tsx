import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useBubbleSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    swapItem,
    stopSort,
    updateColor,
    updateSize,
  } = useContext(ArrayCtx);
  // const itemArrayRef = useRef(itemArray);

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

  const sort = async () => {
    // console.log("BubbleFunction", itemArrayRef.current.length);

    let arr: Item[] = [...itemArrayRef.current];

    for (let i = 0; i < arr.length; i++) {
      // console.log(i);

      for (let j = 0; j < arr.length - i - 1; j++) {
        if (isStopRef.current) {
          await stopSort();
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
  return { sort, info, updateSize };
};
