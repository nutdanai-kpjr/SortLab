import { Dispatch, SetStateAction } from "react";

export interface ISorter {
  (builder: IBasicBuilder): { handleSort: () => Promise<void>; name: string };
}

export interface ISorterBuilder {
  (...args: any[]): {
    numArray: number[];
    setNumArray: Dispatch<SetStateAction<number[]>>;
    colorArray: string[];
    setColorArray: Dispatch<SetStateAction<string[]>>;
    isRunning: boolean;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
    getIsRunning: () => boolean;
    changeColor: (indexs: number[], color: string) => Promise<void>;
    changeArray: (
      newArr: number[],
      option?: {
        resetColor?: boolean;
      }
    ) => Promise<void>;
    changeSize: (newSize: number) => Promise<void>;
    sleep: (ms: number) => Promise<void>;
    swap: (arr: number[], a: number, b: number) => Promise<void>;
  };
}

export interface IBasicBuilder {
  numArray: number[];
  getIsRunning: () => boolean;
  swap: (arr: number[], a: number, b: number) => Promise<void>;
  changeColor: (indexs: number[], color: string) => Promise<void>;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}

export interface IAdvancedBuilder extends IBasicBuilder {
  changeArray: (newArr: number[]) => Promise<void>;
}
