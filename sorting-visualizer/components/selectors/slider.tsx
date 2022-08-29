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
    onValueChanged(size);
  };

  return (
    <>
      <ReactSlider
        min={2}
        max={50}
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
