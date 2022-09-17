import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useInsertionSort: () => SortAlgorithm = () => {
  const { itemArrayRef, isStopRef, stopSort, replaceItem, updateColor } =
    useContext(ArrayCtx);

  const info = {
    name: "Insertion Sort",
    description:
      "Insertion Sort is a simple sorting algorithm that works the way we sort playing cards in our hands.",
    complexity: {
      bestCase: "O(n)",
      averageCase: "O(n^2)",
      worstCase: "O(n^2)",
    },
  };

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];
    for (let i = 1; i < arr.length; i++) {
      arr = [...itemArrayRef.current];
      // choose the first element in our unsorted subarray
      let firstUnsorted = { ...arr[i] };
      await updateColor([i], COLORS.INPROGRESS);
      let j = i - 1;
      let lastSorted = { ...arr[j] };
      while (j >= 0 && lastSorted.value > firstUnsorted.value) {
        if (isStopRef.current) return await stopSort();
        arr = [...itemArrayRef.current];
        // Through a while loop, we go through the sorted array and shift elements to the right, opening up a space for the current element to be inserted.
        await updateColor([j + 1], COLORS.SECONDARY);
        await replaceItem(j + 1, { ...arr[j] });
        // Once we find the proper place for it, the current element is inserted into the newly-opened slot. This process is repeated for each iteration until the array is sorted  Cr.https://stackabuse.com/insertion-sort-in-javascript/
        j--;
        lastSorted = { ...arr[j] };
      }
      // we found the proper place for the current element
      await updateColor([j + 1], COLORS.SUCCESS);
      await replaceItem(j + 1, firstUnsorted);

      let indexArr = Array.from(Array(arr.length).keys());
      await updateColor(indexArr, COLORS.PRIMARY);

      // the last element of our sorted subarray
    }
  };
  return { sort, info };
};
