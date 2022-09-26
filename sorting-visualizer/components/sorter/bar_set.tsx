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
    getIsShowExplainText,
    getExplainText,
    sortAlgorithms,
    currentSortAlgorithm,
    changeSortAlgorithm,
    changeSize,
    changeSpeed,
    stop,
    reset,
    toggleAudio,
    toggleExplainText,
  } = useSortVisualizer();
  const [hydrated, setHydrated] = useState(false);
  const leanMode = getArray().length > 50;
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
            <button
              onClick={() => {
                toggleExplainText();
              }}
            >
              <Image
                alt="Show Explain Text Button"
                width={getIsShowExplainText() ? 40 : 44}
                height={getIsShowExplainText() ? 50 : 55}
                src={
                  getIsShowExplainText()
                    ? "/explainer-on-icon.svg"
                    : "/explainer-off-icon.svg"
                }
              ></Image>
            </button>
          </div>
          <div className={styles.sliderSetting}>
            <Slider
              title={`Array Size : ${getArray().length}`}
              defaultValue={getArray().length}
              max={50}
              onValueChanged={changeSize}
              isRangeExtendable={true}
              extendedRange={1500}
            ></Slider>
            <Slider
              title={`Speed : ${getSpeed() / 1000} sec/step`}
              min={1}
              max={1000}
              invert={true}
              defaultValue={getSpeed()}
              onValueChanged={changeSpeed}
            ></Slider>
          </div>
        </div>
        <div className={styles.container}>
          {getIsShowExplainText() && getExplainText().length > 0 ? (
            <div className={styles.explainText}> {getExplainText()}</div>
          ) : (
            <></>
          )}
          {getArray().map((v, i) => (
            <Bar key={i} value={v.value} color={v.color} leanMode={leanMode} />
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
    </div>
  );
}
