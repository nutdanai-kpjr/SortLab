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
  isStop: boolean;
  setItemArray: Dispatch<SetStateAction<Item[]>>;
  setSpeed: Dispatch<SetStateAction<number>>;
  setIsStop: Dispatch<SetStateAction<boolean>>;
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
  isStop: true,
  setItemArray: () => {},
  setSpeed: () => {},
  setIsStop: () => {},
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
  const maxDelay = 1001;
  const [itemArray, setItemArray] = useState<Item[]>(generateRandomItemArray());
  const [speed, setSpeed] = useState<number>(800);
  const [isStop, setIsStop] = useState<boolean>(false);
  const itemArrayRef = useRef(itemArray);
  const speedRef = useRef(speed);
  useEffect(() => {
    // console.log("ArrayProvider: itemArray changed", itemArray.length);
    itemArrayRef.current = itemArray;
  }, [itemArray]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  // const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
    isStop,
    setItemArray,
    setSpeed,
    setIsStop,
    animate,
    updateArray,
    updateSize,
    updateColor,
    swapItem,
  };

  return <ArrayCtx.Provider value={arrayCtx}> {children}</ArrayCtx.Provider>;
};
