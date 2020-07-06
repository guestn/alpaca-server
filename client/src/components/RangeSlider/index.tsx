/** @jsx jsx */

import React, { useState, ChangeEvent } from 'react';
import { css, jsx } from '@emotion/core';


interface RangeSliderProps {
  min: number,
  max: number,
  value: number,
}

import styles from './styles';

const RangeSlider = () => {
  const [valueMin, setValueMin] = useState(20);
  const [valueMax, setValueMax] = useState(80);

  const onChangeSlider = (e: ChangeEvent<HTMLInputElement> | null, slider: string) => {
    console.log(e.target.value)
    const value = parseFloat(e.target.value);
    if (slider === 'min') {
      if (value > valueMax) {
        e.preventDefault;
        return setValueMin(valueMax);
      }
      setValueMin(value)
      //rangeMin.innerHTML = value;
    } else {
      if (value < valueMin) {
        e.preventDefault;
        return setValueMax(valueMin);
      }
      setValueMax(value)
      //rangeMin.innerHTML = value;
    }
  }
  return (
    <div css={styles.rangeSlider}>
      <input css={styles.range} id="range1" type="range" min="1" max="100" value={valueMin} onChange={(e) => onChangeSlider(e, 'min')} />
      <input css={styles.range} id="range2" type="range" min="1" max="100" value={valueMax} onChange={(e) => onChangeSlider(e, 'max')} />
      <span className="range_min light left" id="rangeMin">{ valueMin }</span>
      <span className="range_max light right" id="rangeMax">{ valueMax }</span>
    </div>
  )
}

export default RangeSlider;