import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS, getGradientColor, getRandomColor } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useHeapSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    swapItem,
    isStopRef,
    stopSort,
    updateColor,
    updateArray,
    updateArrayFromRange,
    updateDifferentColor,
    blinkItemDifferentColor,
    replaceItem,
  } = useContext(ArrayCtx);

  const info = {
    name: "Heap Sort",
    description:
      "Heap Sort is a comparison based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for remaining element.",
    complexity: {
      bestCase: "O(n log(n))",
      averageCase: "O(n log(n))",
      worstCase: "O(n log(n))",
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
      let item = itemArrayRef.current[arrIndex];
      let itemHeapLevel = this.getHeapLevel(arrIndex);
      let color = getGradientColor(itemHeapLevel + 1); //gradient level start from 1st level
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

      await updateArrayFromRange(start, end, this.heap);
      let lastItem = this.heap.pop();
      if (lastItem) {
        this.heap.unshift(lastItem);
        await updateArrayFromRange(start, end, this.heap);
      }

      await this.heapifyDown(start, end);
      if (rootItem) rootItem = { ...rootItem, color: COLORS.SORTED };
      return rootItem;
    }

    async heapifyUp() {
      let lastItemIndex = this.heap.length - 1;
      let parentOfLastItemIndex = this.getParentIndex(lastItemIndex);
      // await blinkItemDifferentColor(
      //   [
      //     { index: lastItemIndex, color: COLORS.SPECIAL },
      //     { index: parentOfLastItemIndex, color: COLORS.SPECIAL },
      //   ],
      //   COLORS.COMPARE,
      //   3
      // );

      while (
        lastItemIndex > 0 &&
        this.isSmaller(lastItemIndex, parentOfLastItemIndex)
      ) {
        // we want fmin at top , so swap if child is smaller than parent
        await swapItem(lastItemIndex, parentOfLastItemIndex);
        this.swap(lastItemIndex, parentOfLastItemIndex);
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

        this.swap(rootIndex, smallerChildIndex);
        await updateArrayFromRange(start, end, this.heap);
        rootIndex = smallerChildIndex;
        leftChildIndex = this.getLeftChildIndex(rootIndex);
        rightChildIndex = this.getRightChildIndex(rootIndex);
      }
      return;
    }
    swap(a: number, b: number) {
      [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
      this.heap[a].color = getGradientColor(this.getHeapLevel(a) + 1);
      this.heap[b].color = getGradientColor(this.getHeapLevel(b) + 1);
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
    let sorted: Item[] = [];
    let minHeap = new MinHeap();

    for (let i = 0; i < arr.length; i++) {
      if (isStopRef.current) return await stopSort();
      await minHeap.add(i);
      if (i > 0) await updateArrayFromRange(0, i, minHeap.heap);
    }
    await updateArray(minHeap.heap);
    for (let i = 0; i < arr.length; i++) {
      if (isStopRef.current) return await stopSort();
      let item = await minHeap.remove(i + 1, arr.length - 1);
      if (item) {
        await updateArrayFromRange(i + 1, arr.length - 1, minHeap.heap);
        if (i < arr.length - 1) {
          await replaceItem(i, item);
          await blinkItemDifferentColor(
            [
              { index: i + 1, color: COLORS.FREE1 },
              { index: arr.length - 1, color: COLORS.FREE2 },
            ],
            COLORS.COMPARE,
            3
          );
        } else {
          await updateColor([i], COLORS.SORTED);
        }

        sorted.push(item);
      }
    }
  };

  return { sort, info };
};
