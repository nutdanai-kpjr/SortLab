import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Item } from "../hooks/sorter_abstract";
import { useStateWithRef } from "../hooks/use_state_with_ref";
import {
  generateRandomItemArray,
  randomColor,
  randomNumber,
} from "../hooks/utils";
import { COLORS } from "../styles/color";
interface updateDiffrentColorInstruction {
  index: number;
  color: string;
}
export interface IArrayContext {
  itemArray: Item[];
  itemArrayRef: React.MutableRefObject<Item[]>;
  speed: number;
  speedRef: React.MutableRefObject<number>;
  isStop: boolean;
  isStopRef: React.MutableRefObject<boolean>;
  setItemArray: (newState: Item[]) => void;
  setSpeed: (newState: number) => void;
  setIsStop: (newState: boolean) => void;
  animate: (speed: number) => Promise<void>;
  replaceItem: (index: number, newItem: Item) => Promise<void>;
  updateArray: (newArray: Item[]) => Promise<void>;
  updateSize: (newSize: number) => void;
  updateColor: (indexs: number[], color: string) => Promise<void>;
  updateDifferentColor: (
    instructions: updateDiffrentColorInstruction[]
  ) => Promise<void>;
  updateColorFromRange: (
    start: number,
    end: number,
    color: string
  ) => Promise<void>;
  swapItem: (indexA: number, indexB: number) => Promise<void>;
  stopSort: () => Promise<void>;
}

// Provider in your app
const initArrayCtx: IArrayContext = {
  itemArray: [],
  itemArrayRef: { current: [] },
  speed: 100,
  speedRef: { current: 800 },
  isStop: true,
  isStopRef: { current: false },
  setItemArray: () => {},
  setSpeed: () => {},
  setIsStop: () => {},
  animate: () => Promise.resolve(),
  replaceItem: () => Promise.resolve(),
  updateArray: () => Promise.resolve(),
  updateSize: () => {},
  updateColor: () => Promise.resolve(),
  updateDifferentColor: () => Promise.resolve(),
  updateColorFromRange: () => Promise.resolve(),
  swapItem: () => Promise.resolve(),
  stopSort: () => Promise.resolve(),
};

export const ArrayCtx = createContext<IArrayContext>(initArrayCtx);

export const ArrayProvider = ({ children }: { children: React.ReactNode }) => {
  // Level 1 :  Low Level Operations
  const maxDelay = 1001;
  const [itemArray, setItemArray, itemArrayRef] = useStateWithRef(
    generateRandomItemArray(20)
  );
  const [speed, setSpeed, speedRef] = useStateWithRef<number>(800);
  const [isStop, setIsStop, isStopRef] = useStateWithRef<boolean>(false);

  const animate = async (speed: number) => {
    const delay: number = maxDelay - speed;
    console.log("speed", speed);
    await new Promise<void>((resolve) => setTimeout(resolve, delay));
  };

  // Level 2 :  Medium Level Operations
  const updateArray = async (newArray: Item[]) => {
    // console.log("updateArray", newArray);
    let speed = speedRef.current;
    setItemArray(newArray);
    await animate(speed);
  };
  const updateSize = (newSize: number) => {
    setItemArray(generateRandomItemArray(newSize));
    // setItemArray(newArray);
  };

  const updateColor = async (indexs: number[], color: string) => {
    let newArray: Item[] = [...itemArrayRef.current];

    indexs.forEach((i) => {
      newArray[i].color = color;
    });
    // console.log("newArray", newArray);
    await updateArray([...newArray]);
  };
  const updateColorFromRange = async (
    start: number,
    end: number,
    color: string
  ) => {
    let newArray: Item[] = [...itemArrayRef.current];

    for (let i = start; i < end; i++) {
      newArray[i].color = color;
    }
    // console.log("newArray", newArray);
    await updateArray([...newArray]);
  };
  const updateDifferentColor = async (
    instructions: updateDiffrentColorInstruction[]
  ) => {
    let newArray: Item[] = [...itemArrayRef.current];
    instructions.forEach((instruction) => {
      newArray[instruction.index].color = instruction.color;
    });
    await updateArray([...newArray]);
  };
  //
  // Level 3 :  High Level Operations
  const swapItem = async (indexA: number, indexB: number) => {
    // console.log("swapItem ArrayProvider Function", itemArrayRef.current.length);
    let newArray: Item[] = [...itemArrayRef.current];

    [newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]];

    await updateArray([...newArray]);
  };

  const replaceItem = async (index: number, newItem: Item) => {
    let newArray: Item[] = [...itemArrayRef.current];
    newArray[index] = newItem;
    await updateArray([...newArray]);
  };

  const stopSort = async () => {
    let arr: Item[] = [...itemArrayRef.current];
    let indexArr = Array.from(Array(arr.length).keys());
    await updateColor(indexArr, COLORS.PRIMARY); //change back to original color
    setIsStop(false);
  };
  const arrayCtx: IArrayContext = {
    itemArray,
    itemArrayRef,
    speed,
    speedRef,
    isStop,
    isStopRef,
    setItemArray,
    setSpeed,
    setIsStop,
    animate,
    updateArray,
    updateSize,
    updateColor,
    updateDifferentColor,
    updateColorFromRange,
    swapItem,
    replaceItem,
    stopSort,
  };

  return <ArrayCtx.Provider value={arrayCtx}> {children}</ArrayCtx.Provider>;
};
