import Bar from "./bar";
import styles from "../../styles/BarSet.module.css";

import { Slider } from "../selectors/slider";
import Dropdown from "../selectors/dropdown";
import { useEffect, useState } from "react";

import { useSortVisualizer } from "../../hooks/sorter_implement";

export default function BarSet() {
  //this component manage the array of numbers that will be sorted
  const {
    play,
    getName,
    getDescription,
    getComplexity,
    getArray,
    getSpeed,
    sortAlgorithms,
    currentSortAlgorithm,
    changeSortAlgorithm,
    changeSize,
    changeSpeed,
    stop,
    reset,
  } = useSortVisualizer();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div>
      {/* <h1>{getArray().map((i) => i.value)}</h1> */}
      {/* <h2>{getName()}</h2> */}

      <Dropdown
        list={sortAlgorithms.map((algo) => algo.info.name)}
        defaultValue={currentSortAlgorithm.info.name}
        onChange={changeSortAlgorithm}
      ></Dropdown>
      <Slider
        title="Array Size"
        defaultValue={getArray().length}
        onValueChanged={changeSize}
      ></Slider>
      <Slider
        title="Speed"
        min={1}
        max={1000}
        defaultValue={getSpeed()}
        onValueChanged={changeSpeed}
      ></Slider>
      <div>
        <button
          onClick={async () => {
            await play();
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            stop();
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
      <div className={styles.container}>
        {getArray().map((v, i) => (
          <Bar key={i} value={v.value} color={v.color} />
        ))}
      </div>

      <h1>{getName()}</h1>
      <p>{getDescription()}</p>
      <p>Worst case: {getComplexity().worstCase}</p>
      <p>Average case: {getComplexity().averageCase}</p>
      <p>Best case: {getComplexity().bestCase}</p>

      {/* <button
        onClick={async () => {
      await handleStop();
        }}
      >
        Stop
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
      </button> */}
    </div>
  );
}
