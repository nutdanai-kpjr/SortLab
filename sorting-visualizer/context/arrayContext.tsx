import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Item } from "../hooks/sorter_abstract";
import {
  generateRandomItemArray,
  randomColor,
  randomNumber,
} from "../hooks/utils";
import { COLORS } from "../styles/color";

export interface IArrayContext {
  itemArray: Item[];
  speed: number;
  isProcessing: boolean;
  setItemArray: Dispatch<SetStateAction<Item[]>>;
  setSpeed: Dispatch<SetStateAction<number>>;
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  animate: (speed: number) => Promise<void>;
  updateArray: (newArray: Item[]) => Promise<void>;
  updateSize: (newSize: number) => void;
  updateColor: (indexs: number[], color: string) => Promise<void>;
  swapItem: (indexA: number, indexB: number) => Promise<void>;
}

// Provider in your app
const initArrayCtx: IArrayContext = {
  itemArray: [],
  speed: 100,
  isProcessing: false,
  setItemArray: () => {},
  setSpeed: () => {},
  setIsProcessing: () => {},
  animate: () => Promise.resolve(),
  updateArray: () => Promise.resolve(),
  updateSize: () => {},
  updateColor: () => Promise.resolve(),
  swapItem: () => Promise.resolve(),
};

export const ArrayCtx = createContext<IArrayContext>(initArrayCtx);

export const ArrayProvider = ({ children }: { children: React.ReactNode }) => {
  // Level 1 :  Low Level Operations
  const defaultColor = COLORS.PRIMARY;
  const [itemArray, setItemArray] = useState<Item[]>(generateRandomItemArray());
  const [speed, setSpeed] = useState<number>(800);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const itemArrayRef = useRef(itemArray);

  // const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const animate = async (speed: number) => {
    const maxDelay = 1001;
    const delay: number = maxDelay - speed;
    await new Promise<void>((resolve) => setTimeout(resolve, delay));
  };

  // Level 2 :  Medium Level Operations
  const updateArray = async (newArray: Item[]) => {
    // console.log("updateArray", newArray);

    setItemArray(newArray);
    await animate(800);
  };
  const updateSize = (newSize: number) => {
    setItemArray(generateRandomItemArray());
    // setItemArray(newArray);
  };
  useEffect(() => {
    // console.log("ArrayProvider: itemArray changed", itemArray.length);

    itemArrayRef.current = itemArray;
  }, [itemArray]);

  const updateColor = async (indexs: number[], color: string) => {
    let newArray: Item[] = [...itemArrayRef.current];

    indexs.forEach((i) => {
      newArray[i].color = color;
    });
    // console.log("newArray", newArray);
    await updateArray([...newArray]);
  };
  //
  // Level 3 :  High Level Operations
  const swapItem = async (indexA: number, indexB: number) => {
    // console.log("swapItem ArrayProvider Function", itemArrayRef.current.length);
    let newArray: Item[] = [...itemArrayRef.current];

    [newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]];
    newArray[indexB].color = COLORS.SUCCESS;

    await updateArray([...newArray]);
  };
  const arrayCtx: IArrayContext = {
    itemArray,
    speed,
    isProcessing,
    setItemArray,
    setSpeed,
    setIsProcessing,
    animate,
    updateArray,
    updateSize,
    updateColor,
    swapItem,
  };

  return <ArrayCtx.Provider value={arrayCtx}> {children}</ArrayCtx.Provider>;
};
