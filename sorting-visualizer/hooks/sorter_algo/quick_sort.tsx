import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS, getRandomColor } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useQuickSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    stopSort,
    replaceItem,
    swapItem,
    updateColor,
    updateColorFromRange,
    updateDifferentColor,
    updateColorExceptFromRange,
    updateArray,
  } = useContext(ArrayCtx);

  const info = {
    name: "Quick Sort",
    description:
      "Quick Sort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.",
    complexity: {
      bestCase: "O(n log(n))",
      averageCase: "O(n log(n))",
      worstCase: "O(n^2)",
    },
  };

  const sort = async () => {
    let n = itemArrayRef.current.length;
    await quickSort(0, n - 1);
  };
  // 1. based case
  // 2. recursive case
  // 2.1 Set pivot
  // 2.2 Partition
  // 2.3 Recursively sort left and right

  const quickSort = async (start: number, end: number) => {
    // if (isStopRef.current) return await stopSort();
    if (start >= end) {
      return;
    }
    let leftColor = getRandomColor();
    let rightColor = getRandomColor();

    let pivotIndex = await partition(start, end);
    // await updateColorFromRange(start, pivotIndex - 1, leftColor);
    // await updateColorFromRange(pivotIndex + 1, end, rightColor);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
    await updateColorFromRange(start, end, COLORS.INACTIVE);
  };
  const partition = async (start: number, end: number): Promise<number> => {
    // 2.2 Partition
    let arr = [...itemArrayRef.current];
    let pivotInsertionIndex = start;
    let pivotInitialIndex = end;
    let pivot = arr[pivotInitialIndex]; // use last element as pivot election
    await updateColor([pivotInitialIndex], COLORS.INPROGRESS);
    let leftColor = COLORS.SUCCESS;
    let rightColor = COLORS.FAILED;
    for (let i = start; i < end; i++) {
      arr = [...itemArrayRef.current];
      await updateColor([i], COLORS.SECONDARY);
      if (arr[i].value < pivot.value) {
        await updateColor([i], leftColor);
        await swapItem(i, pivotInsertionIndex);

        // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
        pivotInsertionIndex++;
      } else {
        await updateColor([i], rightColor);
      }
    }
    arr = [...itemArrayRef.current];
    await updateColor([pivotInitialIndex], leftColor);
    // await updateColor([pivotInsertionIndex], leftColor);
    await swapItem(pivotInsertionIndex, end);

    // await updateColorFromRange(start, end, COLORS.PRIMARY);

    return pivotInsertionIndex;
  };
  return { sort, info };
};
