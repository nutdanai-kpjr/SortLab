import { useContext } from "react";
import { ArrayCtx } from "../../context/arrayContext";
import { COLORS } from "../../styles/color";
import { SortAlgorithm } from "../sorter_abstract";

export const useBubbleSort: () => SortAlgorithm = () => {
  const { itemArray, swapItem, isProcessing, setIsProcessing, updateColor } =
    useContext(ArrayCtx);
  const info = {
    name: "Bubble Sort",
    description:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
    complexity: {
      bestCase: "O(n)",
      averageCase: "O(n^2)",
      worstCase: "O(n^2)",
    },
  };
  const sort = async () => {
    setIsProcessing(true);
    let arr = itemArray;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        let valueA = arr[j].value;
        let valueB = arr[j + 1].value;
        // if (!isRunning) {
        //   return;
        // }
        await updateColor([j, j + 1], COLORS.SECONDARY);
        if (valueA > valueB) {
          console.log(valueA + ">" + valueB);

          //   await updateColor([j], COLORS.SUCCESS);
          await swapItem(j, j + 1);
        }
        await updateColor([j, j + 1], COLORS.PRIMARY);
      }
    }
  };
  return { sort, info, itemArray };
};
