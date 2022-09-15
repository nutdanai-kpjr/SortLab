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
    updateColor,
    updateArray,
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
    mergeSort(arr, 0, arr.length - 1);
  };
  // l is for left index and r is
  // right index of the sub-array
  // of arr to be sorted */
  function mergeSort(arr: Item[], l: number, r: number) {
    if (l >= r) {
      return; //returns recursively
    }
    var m = l + Math.floor((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
  // Merges two subarrays of arr[].
  // First subarray is arr[l..m]
  // Second subarray is arr[m+1..r]
  function merge(arr: Item[], l: number, m: number, r: number) {
    var n1 = m - l + 1;
    var n2 = r - m;

    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++) L[i] = arr[l + i];
    for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    var i = 0;

    // Initial index of second subarray
    var j = 0;

    // Initial index of merged subarray
    var k = l;

    while (i < n1 && j < n2) {
      if (L[i].value <= R[j].value) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
    console.log(arr);
  }

  return { sort, info };
};
