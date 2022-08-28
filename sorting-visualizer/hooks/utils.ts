import { COLORS } from "../styles/color";
import { Item } from "./sorter_abstract";

export const randomNumber = (min=1, max =100) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomItemArray:()=>Item[] = (size=10) => {
    const arr = [];
    for (let i = 0; i < size; i++) {

        arr.push({
            value: randomNumber(),
            color: COLORS.PRIMARY
        });
    }
    return arr;
}