import { useState } from "react";
import ReactSlider from "react-slider";
import styles from "../../styles/Slider.module.css";

export const Slider = ({
  onValueChanged,
  defaultValue,
}: {
  onValueChanged: (n: number) => void;
  defaultValue: number;
}) => {
  const handleChange = (size: number) => {
    console.log(onValueChanged);
    onValueChanged(size);
  };

  return (
    <>
      <div>Slider</div>
      <ReactSlider
        min={2}
        max={10000}
        value={defaultValue}
        onChange={handleChange}
        ariaLabelledby="slider-label"
        thumbClassName={styles.thumb}
        thumbActiveClassName={styles.thumbActive}
        trackClassName={styles.track}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
      ~
    </>
  );
};
