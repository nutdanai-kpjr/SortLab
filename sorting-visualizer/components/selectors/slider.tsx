import { useState } from "react";
import ReactSlider from "react-slider";
import styles from "../../styles/Slider.module.css";

export const Slider = ({
  title,
  onValueChanged,
  defaultValue,
  min = 2,
  max = 50,
}: {
  title: string;
  onValueChanged: (n: number) => void;
  defaultValue: number;
  min?: number;
  max?: number;
}) => {
  const handleChange = (size: number) => {
    onValueChanged(size);
  };

  return (
    <div>
      <span>{title}</span>
      <ReactSlider
        min={min}
        max={max}
        value={defaultValue}
        onChange={handleChange}
        ariaLabelledby="slider-label"
        thumbClassName={styles.thumb}
        thumbActiveClassName={styles.thumbActive}
        trackClassName={styles.track}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
      ~
    </div>
  );
};
