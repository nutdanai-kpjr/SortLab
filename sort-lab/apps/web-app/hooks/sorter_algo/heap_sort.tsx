import { useContext } from 'react';
import { ArrayCtx } from '../../context/arrayContext';
import { COLORS, getGradientColor } from '../../styles/color';
import { Item, SortAlgorithm } from '../sorter_abstract';
import { AudioType } from '../sorter_audio';

export const useHeapSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    swapItem,
    isStopRef,
    stopSort,
    updateColor,
    updateArray,
    updateArrayFromRange,
    blinkItemDifferentColor,
    replaceItem,
    audioPlayer,
    setExplainText,
    getIsLeanMode,
  } = useContext(ArrayCtx);
  const info = {
    name: 'Heap Sort',
    description:
      'Heapsort is a comparison-based sorting algorithm. Heapsort can be thought of as an improved selection sort: like selection sort, heapsort divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region. Unlike selection sort, heapsort does not waste time with a linear-time scan of the unsorted region; rather, heap sort maintains the unsorted region in a heap data structure to more quickly find the largest element in each step.',
    complexity: {
      bestCase: 'O(n log(n))',
      averageCase: 'O(n log(n))',
      worstCase: 'O(n log(n))',
    },
  };
  // 1. Build max heap from array
  // 2. Heapify
  // 2.1 Swap root with last element
  // 2.2 Heapify root
  // 2.3 Repeat 2.1 and 2.2 until heap is empty
  class MinHeap {
    heap: Item[];
    constructor() {
      this.heap = [];
    }

    async add(arrIndex: number) {
      // index of item in itemArrayRef (not heap) (use to update color)
      const item = itemArrayRef.current[arrIndex];
      // update color based on heap level on orginal arr (not heap array)
      const itemHeapLevel = this.getHeapLevel(arrIndex);
      const color = getGradientColor(
        itemHeapLevel + 1,
        getIsLeanMode() ? 10 : 40
      ); //gradient level start from 1st level
      await updateColor([arrIndex], color);

      this.heap.push(item);
      await this.heapifyUp(); // to move the new node up to the correct position
    }

    async remove(start: number, end: number): Promise<Item | undefined> {
      if (this.heap.length === 0) return;
      if (this.heap.length === 1) {
        let rootItem = this.heap.pop();
        if (rootItem) rootItem = { ...rootItem, color: COLORS.SORTED };
        return rootItem;
      }
      // 1. Remove root
      // 2. Replace root with last element
      // 3. Heapify down to move the new root to the correct position
      let rootItem = this.heap.shift();

      await updateArrayFromRange(start, end, this.heap); // update heap array into orginal array (after remove root)

      const lastItem = this.heap.pop();

      if (lastItem) {
        this.heap.unshift(lastItem);

        await updateArrayFromRange(start, end, this.heap); // update heap array into orginal array (after replace new root with last element)
      }

      await this.heapifyDown(start, end); // move the root to the correct position
      if (rootItem) rootItem = { ...rootItem, color: COLORS.SORTED };
      return rootItem;
    }

    async heapifyUp() {
      let lastItemIndex = this.heap.length - 1;
      let parentOfLastItemIndex = this.getParentIndex(lastItemIndex);
      while (
        lastItemIndex > 0 &&
        this.isSmaller(lastItemIndex, parentOfLastItemIndex)
      ) {
        setExplainText('Heapifying up...');
        audioPlayer.playAudio(AudioType.Default);
        // we want min at top , so swap if child is smaller than parent
        await swapItem(lastItemIndex, parentOfLastItemIndex); // swap on orginal array
        this.swap(lastItemIndex, parentOfLastItemIndex); // swap on heap array
        lastItemIndex = parentOfLastItemIndex;
        parentOfLastItemIndex = this.getParentIndex(lastItemIndex);
      }
      // 1. Get last element
      // 2. Get parent
      // 3. Compare parent and last element
      // 4. Swap if parent is smaller
      // 5. Repeat 2-4 until parent is smaller than last element
    }

    async heapifyDown(start: number, end: number) {
      // 1 Compare root with children
      // 2 Swap if root is bigger than children
      // 3. Repeat 3-4 until root is smaller than children

      let rootIndex = 0;
      let leftChildIndex = this.getLeftChildIndex(rootIndex);
      let rightChildIndex = this.getRightChildIndex(rootIndex);

      while (
        this.leftChildIsSmaller(rootIndex) ||
        this.rightChildIsSmaller(rootIndex)
      ) {
        // we known that at least one child is smaller than root
        // so we need to swap root with the smaller child
        // if there is no right child, we can just use left child as a smaller index and vice versa.
        // but if there is both left and right child, we need to compare them to find the smaller one.
        let smallerChildIndex: number;
        // case 0  no child (won't be in this loop)
        // cases 1 only have one child node
        if (this.isHavingOneChild(rootIndex)) {
          smallerChildIndex = this.isLeftChildEmpty(rootIndex)
            ? rightChildIndex
            : leftChildIndex;
        }
        // case 2 have two child node
        else {
          smallerChildIndex = this.isSmaller(leftChildIndex, rightChildIndex)
            ? leftChildIndex
            : rightChildIndex;
        }
        setExplainText('Heapifying down...');
        audioPlayer.playAudio(AudioType.Default);
        this.swap(rootIndex, smallerChildIndex);
        await updateArrayFromRange(start, end, this.heap); // update heap array into orginal array (after swap)
        rootIndex = smallerChildIndex;
        leftChildIndex = this.getLeftChildIndex(rootIndex);
        rightChildIndex = this.getRightChildIndex(rootIndex);
      }
      return;
    }
    swap(a: number, b: number) {
      [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
      this.heap[a].color = getGradientColor(
        this.getHeapLevel(a) + 1,
        getIsLeanMode() ? 10 : 40
      ); // swap gradient color as well
      this.heap[b].color = getGradientColor(
        this.getHeapLevel(b) + 1,
        getIsLeanMode() ? 10 : 40
      );
    }
    getParentIndex = (index: number) => Math.floor((index - 1) / 2);
    getLeftChildIndex = (index: number) => 2 * index + 1;
    getRightChildIndex = (index: number) => 2 * index + 2;

    isHavingOneChild(index: number) {
      return this.isLeftChildEmpty(index) || this.isRightChildEmpty(index);
    }
    isLeftChildEmpty(index: number) {
      return this.getLeftChildIndex(index) >= this.heap.length;
    }
    isRightChildEmpty(index: number) {
      return this.getRightChildIndex(index) >= this.heap.length;
    }
    isSmaller = (index1: number, index2: number): boolean => {
      return (
        !!this.heap[index1] &&
        !!this.heap[index2] &&
        this.heap[index1].value < this.heap[index2].value
      );
    };

    leftChildIsSmaller = (index: number): boolean => {
      return (
        !!this.heap[index] &&
        this.isSmaller(this.getLeftChildIndex(index), index)
      );
    };
    rightChildIsSmaller = (index: number): boolean => {
      return (
        !!this.heap[index] &&
        this.isSmaller(this.getRightChildIndex(index), index)
      );
    };
    getHeapLevel = (index: number) => {
      let level = 0;
      while (index > 0) {
        index = this.getParentIndex(index);
        level++;
      }
      return level;
    };
  }

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];
    // let sorted: Item[] = [];
    const minHeap = new MinHeap();

    for (let i = 0; i < arr.length; i++) {
      if (isStopRef.current) return await stopSort();

      setExplainText(`Adding (${arr[i].value}) from heap`);
      await minHeap.add(i);
    }
    await updateArray(minHeap.heap);
    for (let i = 0; i < arr.length; i++) {
      if (isStopRef.current) return await stopSort();
      // setExplainText("Removing items from heap");
      const item = await minHeap.remove(i + 1, arr.length - 1);
      if (item) {
        if (i < arr.length - 1) {
          // playAudio(item.value);

          await replaceItem(i, item);
          arr = [...itemArrayRef.current];
          setExplainText(
            `Removing root (${arr[i + 1].value}) and Replace it with last (${
              arr[arr.length - 1].value
            })`
          );
          await blinkItemDifferentColor(
            [
              { index: i + 1, color: COLORS.FREE1 },
              { index: arr.length - 1, color: COLORS.FREE2 },
            ],
            COLORS.COMPARE,
            2
          );
        } else {
          await updateColor([i], COLORS.SORTED);
        }
        audioPlayer.playAudio(AudioType.Success);

        // sorted.push(item);
      }
    }
  };

  return { sort, info };
};
