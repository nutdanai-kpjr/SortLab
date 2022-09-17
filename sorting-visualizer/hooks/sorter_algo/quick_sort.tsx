import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import {
  COLORS,
  getRandomColor,
  getRGBAColorWIthOpacity,
} from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useQuickSort: () => SortAlgorithm = () => {
  const {
    animate,
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
    await updateColorFromRange(0, n - 1, COLORS.SUCCESS);
    // pivotNo = 1;
  };
  // 1. based case
  // 2. recursive case
  // 2.1 Set pivot
  // 2.2 Partition
  // 2.3 Recursively sort left and right

  const quickSort = async (start: number, end: number) => {
    // if (isStopRef.current) return await stopSort();
    if (start >= end) {
      // if (start === end) await updateColor([start], COLORS.SUCCESS);

      return;
    }
    let pivotIndex = await partition(start, end);

    // await updateColorFromRange(start, pivotIndex - 1, leftColor);
    // await updateColorFromRange(pivotIndex + 1, end, rightColor);
    await quickSort(start, pivotIndex - 1);
    await updateColorFromRange(start, pivotIndex, COLORS.SUCCESS);
    await quickSort(pivotIndex + 1, end);
  };
  const partition = async (start: number, end: number): Promise<number> => {
    // 2.2 Partition
    let arr = [...itemArrayRef.current];

    let pivotInsertionIndex = start;
    let pivotInitialIndex = end;

    let pivot = arr[pivotInitialIndex]; // use last element as pivot election
    let pivotSize = end - start + 1;
    // console.log(
    //   "pivot no. ",
    //   // pivotNo,
    //   " pivot value ",
    //   pivot.value,
    //   " pivot size ",
    //   pivotSize
    // );
    // pivotNo++;
    await updateColor([pivotInitialIndex], COLORS.INPROGRESS);

    let leftColor = COLORS.FAILED;
    let rightColor = "purple";

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

    // await updateColorFromRange(start, pivotInsertionIndex - 1, leftColor);
    // await updateColorFromRange(pivotInsertionIndex + 1, end, rightColor);

    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SUCCESS },
      { index: end, color: COLORS.INPROGRESS },
    ]);
    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SECONDARY },
      { index: end, color: COLORS.SECONDARY },
    ]);
    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SUCCESS },
      { index: end, color: COLORS.INPROGRESS },
    ]);
    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SECONDARY },
      { index: end, color: COLORS.SECONDARY },
    ]);
    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SUCCESS },
      { index: end, color: COLORS.INPROGRESS },
    ]);
    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SECONDARY },
      { index: end, color: COLORS.SECONDARY },
    ]);
    await updateDifferentColor([
      { index: pivotInsertionIndex, color: COLORS.SUCCESS },
      { index: end, color: COLORS.INPROGRESS },
    ]);
    await swapItem(pivotInsertionIndex, end);

    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    // await updateColor([pivotInsertionIndex], COLORS.SECONDARY);
    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    // await updateColor([pivotInsertionIndex], COLORS.SECONDARY);
    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    // await updateColor([pivotInsertionIndex], COLORS.SECONDARY);
    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    // await updateColor([pivotInsertionIndex], COLORS.SECONDARY);
    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    // await updateColor([pivotInsertionIndex], COLORS.SECONDARY);
    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    // await updateColor([pivotInsertionIndex], COLORS.SECONDARY);
    await updateColorFromRange(start, end, COLORS.SECONDARY);
    // await updateColor([pivotInsertionIndex], COLORS.INPROGRESS);
    await updateColor([pivotInsertionIndex], COLORS.INACTIVE);
    // await updateColor([end], COLORS.SECONDARY);
    // await updateColorFromRange(start, end, COLORS.PRIMARY);

    return pivotInsertionIndex;
  };
  return { sort, info };
};
