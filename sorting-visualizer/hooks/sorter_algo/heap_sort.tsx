import { useContext, useEffect, useRef } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { Item, SortAlgorithm } from "../sorter_abstract";

export const useHeapSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    swapItem,
    isStopRef,
    stopSort,
    updateColor,
    updateDifferentColor,
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

    swap(a: number, b: number) {
      [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    add(arrIndex: number) {
      // index of item in itemArrayRef (not heap) (use to update color)
      let item = itemArrayRef.current[arrIndex];
      this.heap.push(item);
      this.heapifyUp(); // to move the new node up to the correct position
    }

    remove(): Item | undefined {
      if (this.heap.length === 0) return;
      if (this.heap.length === 1) return this.heap.pop();
      // 1. Remove root
      // 2. Replace root with last element
      // console.log("Heap before remove");
      // console.table(this.heap);

      let rootItem = this.heap.shift();
      let lastItem = this.heap.pop();
      if (lastItem) this.heap.unshift(lastItem);

      // console.log("Heap after remove");
      // console.table(this.heap);

      this.heapifyDown();
      // console.log("Heap after heapify down");
      // console.table(this.heap);

      return rootItem;
    }

    heapifyUp() {
      let lastItemIndex = this.heap.length - 1;
      let parentOfLastItemIndex = this.getParentIndex(lastItemIndex);

      while (
        lastItemIndex > 0 &&
        this.isSmaller(lastItemIndex, parentOfLastItemIndex)
      ) {
        // we want min at top , so swap if child is smaller than parent
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

    heapifyDown() {
      // 3. Compare root with children
      // 4. Swap if root is bigger than children
      // 5. Repeat 3-4 until root is smaller than children

      let rootIndex = 0;
      let leftChildIndex = this.getLeftChildIndex(rootIndex);
      let rightChildIndex = this.getRightChildIndex(rootIndex);
      // console.log("Lefft child is smaller", this.leftChildIsSmaller(rootIndex));
      // console.log(
      //   "Right child is smaller",
      //   this.rightChildIsSmaller(rootIndex)
      // );

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

        // console.log("Heap after swap");
        // console.table(this.heap);

        rootIndex = smallerChildIndex;
        leftChildIndex = this.getLeftChildIndex(rootIndex);
        rightChildIndex = this.getRightChildIndex(rootIndex);
      }
      return;
    }
  }

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];
    let sorted: Item[] = [];
    let minHeap = new MinHeap();
    for (let i = 0; i < arr.length; i++) {
      minHeap.add(i);
    }

    // console.log("HeapLength", minHeap.heap.length);
    // console.log("ArrLength", arr.length);

    for (let i = 0; i < arr.length; i++) {
      let item = minHeap.remove();
      // console.log("loop", i);
      if (item) sorted.push(item);
    }
    console.log(sorted);
  };
  return { sort, info };
};
