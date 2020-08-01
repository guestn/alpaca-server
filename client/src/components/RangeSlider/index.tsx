/** @jsx jsx */
import React, { useState, createRef, MouseEvent } from 'react';
import { css, jsx } from '@emotion/core';

import { rangeSlider, slider, track, dragger, legendContainer, valueMarker } from './styles';
import { cachedDataVersionTag } from 'v8';
import { useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  center: number;
  onChangeSlider: (left: number, right: number) => void;
}

const MARGIN_PX = 15;

const SLIDER_WIDTH = 400;

const getValFromPixels = (pixels: number, sliderMin: number, scale: number) => {
  const val = Math.floor(sliderMin + pixels * scale);
  if (isNaN(val)) return 0;
  return val;
};

const RangeSlider = ({ min, max, center, onChangeSlider }: RangeSliderProps) => {
  const trackRef = createRef<HTMLDivElement>();
  const [dragging, setDragging] = useState({ idx: 0 });

  let scale = (center * 0.1) / (SLIDER_WIDTH * 0.5);
  let sliderMin = center * 0.9;
  if (min < center * 0.9) {
    scale = (center - min) / (SLIDER_WIDTH * 0.5);
    sliderMin = min;
  }
  if (max > center * 1.1) {
    scale = (max - center) / (SLIDER_WIDTH * 0.5);
    sliderMin = min * scale;
  }

  const [left, setLeft] = useState((min - sliderMin) / scale || SLIDER_WIDTH * 0.3);
  const [right, setRight] = useState((max - sliderMin) / scale || SLIDER_WIDTH * 0.7);

  useEffect(() => {
    setLeft((min - sliderMin) / scale);
    setRight((max - sliderMin) / scale);
  }, [center]);

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
    onChangeSlider(getValFromPixels(left, sliderMin, scale), getValFromPixels(right, sliderMin, scale));
  };

  const onMouseLeave = (e: MouseEvent): void => {
    setDragging({ idx: 0 });
  };

  //console.log({ sliderMin, min, max, center, scale, left, right });

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
        <span style={{ left }}>{getValFromPixels(left, sliderMin, scale)}</span>
        <span style={{ left: right }}> {getValFromPixels(right, sliderMin, scale)}</span>
        <span>{center}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
