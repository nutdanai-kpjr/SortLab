import Bar from "./bar";
import styles from "../../styles/BarSet.module.css";
import Image from "next/image";

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
    getIsAudioOn,
    sortAlgorithms,
    currentSortAlgorithm,
    changeSortAlgorithm,
    changeSize,
    changeSpeed,
    stop,
    reset,
    toggleAudio,
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

      <div className={styles.barSet}>
        <div className={styles.settingBar}>
          <Dropdown
            list={sortAlgorithms.map((algo) => algo.info.name)}
            defaultValue={currentSortAlgorithm.info.name}
            onChange={changeSortAlgorithm}
          ></Dropdown>
          <div className={styles.buttonGroup}>
            <button
              onClick={async () => {
                await play();
              }}
            >
              <Image
                alt="Play Button"
                width={40}
                height={50}
                src="/play-icon.svg"
              ></Image>
            </button>
            <button
              onClick={() => {
                stop();
              }}
            >
              <Image
                alt="Stop Button"
                width={40}
                height={50}
                src="/stop-icon.svg"
              ></Image>
            </button>
            <button
              onClick={() => {
                reset();
              }}
            >
              <Image
                alt="Reset Button"
                width={40}
                height={50}
                src="/shuffle-icon.svg"
              ></Image>
            </button>
            <button
              onClick={() => {
                toggleAudio();
              }}
            >
              <Image
                alt="Audio Button"
                width={40}
                height={50}
                src={
                  getIsAudioOn() ? "/audio-on-icon.svg" : "/audio-off-icon.svg"
                }
              ></Image>
            </button>
          </div>
          <div className={styles.sliderSetting}>
            <Slider
              title={`Array Size : ${getArray().length}`}
              defaultValue={getArray().length}
              onValueChanged={changeSize}
            ></Slider>
            <Slider
              title={`Speed : ${getSpeed()}`}
              min={1}
              max={1000}
              defaultValue={getSpeed()}
              onValueChanged={changeSpeed}
            ></Slider>
          </div>
          <div></div>
        </div>
        <div className={styles.container}>
          {getArray().map((v, i) => (
            <Bar key={i} value={v.value} color={v.color} />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1>{getName()}</h1>
        <p>{getDescription()}</p>
        <p>Worst case: {getComplexity().worstCase}</p>
        <p>Average case: {getComplexity().averageCase}</p>
        <p>Best case: {getComplexity().bestCase}</p>
      </div>

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
