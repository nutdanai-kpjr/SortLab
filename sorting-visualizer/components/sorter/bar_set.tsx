import Bar from "./bar";
import styles from "../../styles/BarSet.module.css";
import { useSorterUtils } from "../../hooks/sorter_utils";
import { Slider } from "../selectors/slider";
import Dropdown from "../selectors/dropdown";

export default function BarSet() {
  //this component manage the array of numbers that will be sorted

  const {
    numArray,
    changeSize,
    colorArray,
    handleShuffle,
    handleGenerate,
    handleSorterChange,
    getSorterNameList,
    name,
    handleSort,
  } = useSorterUtils();

  return (
    <div>
      <h1>{numArray.toString()}</h1>
      <h2>{name}</h2>
      <Dropdown
        list={getSorterNameList()}
        defaultValue={getSorterNameList()[0]}
        onChange={handleSorterChange}
      ></Dropdown>
      <Slider
        defaultValue={numArray.length}
        onValueChanged={changeSize}
      ></Slider>
      <div className={styles.container}>
        {/* generate 5 bar components */}
        {numArray.map((v, i) => (
          <Bar key={i} value={v} color={colorArray[i]} />
        ))}
      </div>

      <button
        onClick={async () => {
          console.log(changeSize);
          console.log(handleShuffle);

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
