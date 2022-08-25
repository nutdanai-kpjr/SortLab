import Bar from "./bar";
import styles from "../../styles/BarSet.module.css";
import { useSorterUtils } from "../../hooks/sorter_utils";

export default function BarSet() {
  //this component manage the array of numbers that will be sorted

  const { numArray, colorArray, handleShuffle, handleGenerate, handleSort } =
    useSorterUtils();

  return (
    <div>
      <h1>{numArray.toString()}</h1>
      <div className={styles.container}>
        {/* generate 5 bar components */}
        {numArray.map((v, i) => (
          <Bar key={i} value={v} color={colorArray[i]} />
        ))}
      </div>

      <button
        onClick={async () => {
          await handleSort();
        }}
      >
        Sort
      </button>
      <button
        onClick={async () => {
          await handleShuffle();
        }}
      >
        Shuffle
      </button>
      <button
        onClick={async () => {
          await handleGenerate();
        }}
      >
        Generate
      </button>
    </div>
  );
}
