import { useContext } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { SortAlgorithm } from "../sorter_abstract";

export const useQuickSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    stopSort,
    swapItem,
    blinkItemDifferentColor,
    updateColor,
    updateColorFromRange,
  } = useContext(ArrayCtx);

  // let pivotNo = 1;

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
    if (!isStopRef.current) await updateColorFromRange(0, n - 1, COLORS.SORTED);
  };
  // 1. based case
  // 2. recursive case
  // 2.1 Set pivot
  // 2.2 Partition
  // 2.3 Recursively sort left and right

  const quickSort = async (start: number, end: number) => {
    if (isStopRef.current) return await stopSort();
    if (start >= end) {
      return;
    }
    let pivotIndex = await partition(start, end);

    // await updateColorFromRange(start, pivotIndex - 1, leftColor);
    // await updateColorFromRange(pivotIndex + 1, end, rightColor);
    await quickSort(start, pivotIndex - 1);
    await updateColorFromRange(start, pivotIndex, COLORS.SORTED);
    await quickSort(pivotIndex + 1, end);
  };
  const partition = async (start: number, end: number): Promise<number> => {
    if (isStopRef.current) {
      await stopSort();
      return -1;
    }
    // 2.2 Partition
    let arr = [...itemArrayRef.current];

    let pivotInsertionIndex = start;
    let pivotInitialIndex = end;

    let pivot = arr[pivotInitialIndex]; // use last element as pivot election

    await updateColor([pivotInitialIndex], COLORS.SPECIAL);

    let leftColor = COLORS.FREE1;
    let rightColor = COLORS.FREE2;

    for (let i = start; i < end; i++) {
      if (isStopRef.current) {
        await stopSort();
        return -1;
      }
      arr = [...itemArrayRef.current];
      await updateColor([i], COLORS.COMPARE);
      if (arr[i].value < pivot.value) {
        await updateColor([i], leftColor);
        await swapItem(i, pivotInsertionIndex);

        pivotInsertionIndex++;
      } else {
        await updateColor([i], rightColor);
      }
    }
    arr = [...itemArrayRef.current];

    await blinkItemDifferentColor(
      [
        { index: pivotInsertionIndex, color: rightColor },
        { index: end, color: COLORS.SPECIAL },
      ],
      COLORS.COMPARE,
      3
    );

    await swapItem(pivotInsertionIndex, end);

    await updateColorFromRange(start, end, COLORS.INACTIVE);
    // await updateColor([pivotInsertionIndex], COLORS.SPECIAL);
    await updateColor([pivotInsertionIndex], COLORS.BLOCKED);
    // await updateColor([end], COLORS.COMPARE);
    // await updateColorFromRange(start, end, COLORS.DEFAULT);

    return pivotInsertionIndex;
  };
  return { sort, info };
};
