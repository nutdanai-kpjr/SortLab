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
  swap: (arr: number[], a: number, b: number) => Promise<void>;
  changeColor: (indexs: number[], color: string) => Promise<void>;
}

export interface IAdvancedBuilder extends IBasicBuilder {
  changeArray: (newArr: number[]) => Promise<void>;
}
