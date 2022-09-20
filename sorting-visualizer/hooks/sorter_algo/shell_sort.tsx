import { useContext } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS, getRandomColor } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useShellSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    stopSort,
    replaceItem,
    updateColor,
    updateColorFromRange,
    blinkItemDifferentColor,
  } = useContext(ArrayCtx);
  /* 
Shell sort is an optimized version of Insertion sort, that basically allows the exchange of items that are far away from another.

What is special about shell sort is the gap variable you use to sort the items in the array. Do note that if the gap is 1, shell sort is effective as insertion sort. However, usually the array will be sorted before we reach 1 in gap.

Shell sort start by getting a really large gap. We divide the array into smaller sections based on the gap’s size. We then use insertion sort to sort each of this smaller section. Then we reduce the gap for until where gap reaches one. 
by https://levelup.gitconnected.com/

*/
  const info = {
    name: "Shell Sort",
    description:
      "Shell sort is a generalized version of the insertion sort algorithm. It first sorts elements that are far apart from each other and successively reduces the interval between the elements to be sorted. The interval between the elements is reduced based on the sequence used.",
    complexity: {
      bestCase: "O(n log(n))",
      averageCase: "O(n log(n))",
      worstCase: "O(n^2)",
    },
  };

  const generateKnuthSequence = (n: number) => {
    let knuthSequence = [];
    let k = 1;
    while (k < n) {
      knuthSequence.push(k);
      k = 3 * k + 1;
    }
    knuthSequence.reverse();
    return knuthSequence;
  };

  const colorizeGap = async (end: number, gap: number) => {
    let gapColorIndex = [];
    for (let i = end; i >= 0; i -= gap) {
      gapColorIndex.push(i);
    }

    await updateColor(gapColorIndex, COLORS.FREE1);
  };

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];
    let knuthSequence = generateKnuthSequence(arr.length);
    //Start with a really large gap, and then reduce the gap until there isn't any

    for (let gapIndex = 0; gapIndex < knuthSequence.length; gapIndex++) {
      arr = [...itemArrayRef.current];
      let gap = knuthSequence[gapIndex];
      console.log("current gap", gap);

      //Do a insertion sort for each of the section the gap ends up dividing
      // start with select the next candidate to be inserted and then compare it with the previous element in the sorted array; (in case the sorted array is not empty)

      for (let i = gap; i < arr.length; i += 1) {
        await colorizeGap(i, gap);
        arr = [...itemArrayRef.current];
        //We store the current varible
        let firstUnsorted = { ...arr[i] };
        //This is the insection sort to sort the section into order
        let j = i - gap;
        let lastSorted = { ...arr[j] };

        await blinkItemDifferentColor(
          [
            { index: j, color: COLORS.FREE1 },
            { index: i, color: COLORS.FREE1 },
          ],
          COLORS.COMPARE,
          1
        );
        while (j >= 0 && lastSorted.value > firstUnsorted.value) {
          if (isStopRef.current) return await stopSort();
          console.log("new item is less than lastItem in sortedArr, swap");

          arr = [...itemArrayRef.current];
          await updateColor([j + gap], COLORS.COMPARE);
          await replaceItem(j + gap, { ...arr[j] });
          j -= gap;
          lastSorted = { ...arr[j] };
        }
        // right now, j+gap is the index where we want to insert the firstUnsorted in the sorted array

        await replaceItem(j + gap, firstUnsorted);
        await updateColor([j + gap], COLORS.SORTED);
        await updateColorFromRange(0, arr.length - 1, COLORS.DEFAULT);
      }
    }
    await updateColorFromRange(0, arr.length - 1, COLORS.SORTED);
  };

  return { sort, info };
};
