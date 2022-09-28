import { useState } from 'react';
import ReactSlider from 'react-slider';
import styles from '../../styles/components/selectors/Slider.module.css';

export const Slider = ({
  title,
  onValueChanged,
  defaultValue,
  invert = false,
  min = 2,
  max = 50,
  extendedRange = 50,
  isRangeExtendable = false,
  sliderTestName,
}: {
  title: string;
  onValueChanged: (n: number) => void;
  defaultValue: number;
  invert?: boolean;
  isRangeExtendable?: boolean;
  extendedRange?: number;
  min?: number;
  max?: number;
  sliderTestName?: string; // Eg. "size-slider"
}) => {
  const [maxValue, setMaxValue] = useState(max);
  const [isExtend, setExtend] = useState(false);
  const toggleExtend = () => {
    if (isRangeExtendable) {
      setExtend(!isExtend);
      if (isExtend) onValueChanged(max);
      setMaxValue(isExtend ? max : extendedRange);
    }
  };
  const handleChange = (size: number) => {
    onValueChanged(size);
  };

  return (
    <div data-cy={sliderTestName} className={styles.container}>
      <div className={styles.title}>
        {title}{' '}
        {isRangeExtendable && (
          <button onClick={toggleExtend}>
            {' '}
            {!isExtend ? 'Extend' : 'Reduce'}
          </button>
        )}
      </div>

      <style>{`
        .customSlider-track {
          /* Top value to align your track to the center of your thumb */
          top: 8px;
          /* thickness of the track */
          height: 4px;
          /* default color of your track */
          background: #ddd;
        }

        .customSlider-track.customSlider-track-0 {
          /* color of the track before the thumb */
          background: rgb(104, 117, 217);
        }
        .customSlider-thumb {
          cursor: pointer;
          /*color for the thumb */
          background: rgb(104, 117, 217);
          /* shape of the thumb: circle */
          width: 20px;
          height: 20px;
          border-radius: 100%;
          /* remove default outline when selected */
          outline: none;
        }
        
        .customSlider-thumb:hover {
          box-shadow: 0 0 0 8px rgb(104, 117, 217, 0.2);
        }
        .customSlider-track-inverse {
          /* Top value to align your track to the center of your thumb */
          top: 8px;
          /* thickness of the track */
          height: 4px;
          /* color of the track before the thumb */
          background: rgb(104, 117, 217);
        }

        .customSlider-track-inverse.customSlider-track-inverse-0 {
          /* default color of your track */
          background: #ddd;
   
        }
      `}</style>
      <ReactSlider
        min={min}
        max={maxValue}
        invert={invert}
        value={defaultValue}
        onChange={handleChange}
        ariaLabelledby="slider-label"
        thumbClassName="customSlider-thumb"
        trackClassName={
          invert ? 'customSlider-track-inverse' : 'customSlider-track'
        }
        renderThumb={(props, state) => <div {...props}></div>}
      />
    </div>
  );
};
