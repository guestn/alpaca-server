/** @jsx jsx */
import React, { useState, createRef, MouseEvent } from 'react';
import { css, jsx } from '@emotion/core';

import { rangeSlider, slider, track, dragger, legendContainer, valueMarker } from './styles';

interface RangeSliderProps {
  min: number;
  max: number;
  center: number;
}

const MARGIN_PX = 15;

const SLIDER_WIDTH = 400;

const RangeSlider = ({ min, max, center }: RangeSliderProps) => {
  const trackRef = createRef<HTMLDivElement>();
  const [dragging, setDragging] = useState({ idx: 0 });
  const [left, setLeft] = useState(SLIDER_WIDTH * 0.3);
  const [right, setRight] = useState(SLIDER_WIDTH * 0.7);

  const onMouseDown = (e: MouseEvent, idx: number) => {
    setDragging({ idx });
  };

  const onMouseMove = (e: MouseEvent): void => {
    e.preventDefault();
    const x = (trackRef.current && trackRef.current.offsetLeft) || 0;
    const w = (trackRef.current && trackRef.current.offsetWidth) || 0;

    if (dragging.idx > 0) {
      if (e.clientX - x >= 0 && e.clientX - x <= w) {
        if (dragging.idx === 1 && e.clientX - x < right - MARGIN_PX) {
          setLeft(e.clientX - x);
        }
        if (dragging.idx === 2 && e.clientX - x > left + MARGIN_PX) {
          setRight(e.clientX - x);
        }
      }
    }
  };

  const onMouseUp = (e: MouseEvent): void => {
    if (dragging.idx === 1 && left > right - MARGIN_PX) {
      setLeft(right - MARGIN_PX);
    }
    if (dragging.idx === 2 && left > right - MARGIN_PX) {
      setRight(left + MARGIN_PX);
    }
    setDragging({ idx: 0 });
  };

  const onMouseLeave = (e: MouseEvent): void => {
    setDragging({ idx: 0 });
  };

  const getValFromPixels = (pixels: number) => {
    const scale = (max - min) / SLIDER_WIDTH;
    return Math.floor(min + pixels * scale);
  };

  //console.log('left/right', left, right);

  return (
    <div css={rangeSlider(SLIDER_WIDTH)} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
      <div css={track(SLIDER_WIDTH)} ref={trackRef}>
        <div css={slider} style={{ left, width: right - left }}>
          <div css={dragger} onMouseDown={(e) => onMouseDown(e, 1)} />
          <div css={dragger} onMouseDown={(e) => onMouseDown(e, 2)} />
        </div>
        <div css={valueMarker} />
      </div>
      <div css={legendContainer}>
        <span style={{ left }}>{getValFromPixels(left)}</span>
        <span style={{ left: right }}> {getValFromPixels(right)}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
