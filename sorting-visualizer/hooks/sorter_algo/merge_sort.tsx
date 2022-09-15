import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS, getRandomColor } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useMergeSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    stopSort,
    replaceItem,
    updateColorFromRange,
  } = useContext(ArrayCtx);

  const info = {
    name: "Merge Sort",
    description:
      "Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves.",
    complexity: {
      bestCase: "O(n log(n))",
      averageCase: "O(n log(n))",
      worstCase: "O(n log(n))",
    },
  };

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];
    await mergeSort(arr, 0, arr.length - 1);
    await updateColorFromRange(0, arr.length - 1, COLORS.SUCCESS);
  };
  // l is for left index and r is
  // right index of the sub-array
  // of arr to be sorted */
  async function mergeSort(arr: Item[], l: number, r: number) {
    console.log("mergeSort", isStopRef.current);
    if (isStopRef.current) {
      console.log("stop at mergeSort 0");
      return await stopSort();
    }
    if (l >= r) {
      return; //  If the array has only one element (l , r is point at the same), return
      // why? because we need to have at least 2 elements to merge
    }

    let m = l + Math.floor((r - l) / 2); //divide the array into two halves
    await updateColorFromRange(l, m, getRandomColor());
    await updateColorFromRange(m + 1, r, getRandomColor());
    await mergeSort(arr, l, m); // start to middle of the array (left)
    await mergeSort(arr, m + 1, r); // middle+1 to end of the array (right)
    await merge(arr, l, m, r); // merge the two halves
  }
  // Merges two subarrays of arr[].
  // First subarray is arr[l..m]
  // Second subarray is arr[m+1..r]
  async function merge(arr: Item[], l: number, m: number, r: number) {
    console.log("merge", l, m, r);

    if (isStopRef.current) {
      console.log("stop at merge 0");
      return await stopSort();
    }
    let n1 = m - l + 1; // size of the left subarray (l to m) we need to +1 because we need to include the m
    let n2 = r - m; // size of the right subarray

    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    var i = 0;

    // Initial index of second subarray
    var j = 0;

    // Initial index of merged subarray
    var k = l;

    // await updateColorFromRange(m + 1, r, COLORS.INPROGRESS);

    while (i < n1 && j < n2) {
      console.log("merge 1", isStopRef.current);
      if (isStopRef.current) {
        console.log("stop at merge 1");
        return await stopSort();
      }
      // animation here
      // await updateColor([i, j], COLORS.SECONDARY);
      // await updateColorFromRange(i, n1, COLORS.SECONDARY);

      if (L[i].value <= R[j].value) {
        arr[k] = L[i];
        await replaceItem(k, L[i]);
        i++;
        // animation here
      } else {
        arr[k] = R[j];
        await replaceItem(k, R[j]);
        j++;
        // animation here
      }
      k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      console.log("merge 2", isStopRef.current);
      if (isStopRef.current) {
        console.log("stop at merge 2");
        return await stopSort();
      }
      arr[k] = L[i];
      await replaceItem(k, L[i]);
      i++;
      k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      console.log("merge 3", isStopRef.current);
      if (isStopRef.current) {
        console.log("stop at merge 3");
        return await stopSort();
      }
      arr[k] = R[j];
      await replaceItem(k, R[j]);
      j++;
      k++;
    }
    console.log("merge 4", isStopRef.current);
    if (isStopRef.current) {
      console.log("stop at merge 4");
      return await stopSort();
    }
    await updateColorFromRange(l, r, getRandomColor());
  }

  return { sort, info };
};
