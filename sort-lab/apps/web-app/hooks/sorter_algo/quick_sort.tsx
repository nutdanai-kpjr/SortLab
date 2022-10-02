import { useContext } from 'react';
import { ArrayCtx } from '../../context/arrayContext';
import { COLORS } from '../../styles/color';
import { SortAlgorithm } from '../sorter_abstract';
import { AudioType } from '../sorter_audio';

export const useQuickSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    stopSort,
    swapItem,
    blinkItemDifferentColor,
    updateColor,
    updateColorFromRange,
    audioPlayer,
    setExplainText,
  } = useContext(ArrayCtx);

  const info = {
    name: 'Quick Sort',
    description:
      'Quick Sort is a Divide and Conquer algorithm. It will pick a pivot, and start partitioning by moving all the elements that are less than the pivot to the left, and the rest to the right. and then repeat a partitioning process again until the array no longer can be partitioned.',
    complexity: {
      bestCase: 'O(n log(n))',
      averageCase: 'O(n log(n))',
      worstCase: 'O(n^2)',
    },
  };

  const sort = async () => {
    const n = itemArrayRef.current.length;
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
      setExplainText(`Partitioning Finished `);
      return;
    }
    const pivotIndex = await partition(start, end);

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

    const pivotInitialIndex = end;

    const pivot = arr[pivotInitialIndex]; // use last element as pivot election
    audioPlayer.playAudio(AudioType.Default);
    setExplainText(`Partitioning array by Pivot: ${pivot.value}`);
    await updateColor([pivotInitialIndex], COLORS.SPECIAL);

    const leftColor = COLORS.FREE1;
    const rightColor = COLORS.FREE2;

    for (let i = start; i < end; i++) {
      if (isStopRef.current) {
        await stopSort();
        return -1;
      }
      arr = [...itemArrayRef.current];
      audioPlayer.playAudio(AudioType.Default);
      await updateColor([i], COLORS.COMPARE);
      if (arr[i].value < pivot.value) {
        await updateColor([i], leftColor);
        await swapItem(i, pivotInsertionIndex);

        pivotInsertionIndex++;
      } else {
        await updateColor([i], rightColor);
      }
    }

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

    await updateColor([pivotInsertionIndex], COLORS.BLOCKED);

    return pivotInsertionIndex;
  };
  return { sort, info };
};
