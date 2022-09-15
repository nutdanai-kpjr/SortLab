import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useSelectionSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    swapItem,
    isStopRef,
    stopSort,
    updateColor,
    updateDifferentColor,
  } = useContext(ArrayCtx);

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

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];

    for (let i = 0; i < arr.length; i++) {
      // FInd the smallest element in the unsorted array
      // await updateColor([i], COLORS.SECONDARY);
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (isStopRef.current) {
          return await stopSort();
        }
        arr = [...itemArrayRef.current]; // refetch the array from context to avoid stale state
        let valueNew = { ...arr[j] }.value;
        let valueMin = { ...arr[min] }.value;
        await updateDifferentColor([
          { index: min, color: COLORS.INPROGRESS },
          { index: j, color: COLORS.SECONDARY },
        ]);
        //Comparing;
        if (valueNew < valueMin) {
          await updateColor([min], COLORS.PRIMARY);
          min = j;
          await updateColor([min], COLORS.INPROGRESS);
        } else {
          await updateColor([j, min], COLORS.PRIMARY); // Loser
        }
      }
      // await updateColor([min], COLORS.SUCCESS);
      await updateColor([min], COLORS.INPROGRESS);

      if (min !== i) {
        await swapItem(i, min);
      }
      await updateColor([i], COLORS.SUCCESS);
    }
  };
  return { sort, info };
};
