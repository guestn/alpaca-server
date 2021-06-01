/** @jsx jsx */
import React, { useState, useEffect, createRef, MouseEvent } from 'react';
import { css, jsx } from '@emotion/core';

import { rangeSlider, slider, track, dragger, legendContainer, valueMarker } from './styles';

interface RangeSliderProps {
    min: number;
    max: number;
    center: number;
    onChangeSlider: (left: number, right: number, enableUpdate: boolean) => void;
}

const MARGIN_PX = 15;
const SLIDER_WIDTH = 400;

const getValFromPixels = (pixels: number, sliderMin: number, scale: number): number => {
    const val = sliderMin + pixels * scale;
    if (isNaN(val)) return 0;

    const roundedVal = val < 100 ? val.toFixed(1) : val.toFixed(0);
    return parseFloat(roundedVal);
};

const getPercentChange = (pixels: number, sliderMin: number, scale: number, center: number) => {
    const val = getValFromPixels(pixels, sliderMin, scale);
    return (100 * val) / center;
};

const RangeSlider = ({ min, max, center, onChangeSlider }: RangeSliderProps) => {
    const trackRef = createRef<HTMLDivElement>();
    const [dragging, setDragging] = useState({ idx: 0 });

    console.log({ min, max, center });
    
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
    console.log({ min, max, sliderMin });
    

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
        const enableUpdate = leftDisplayVal !== min || rightDisplayVal !== max;

        onChangeSlider(
            getValFromPixels(left, sliderMin, scale),
            getValFromPixels(right, sliderMin, scale),
            enableUpdate,
        );
    };

    const onMouseLeave = (e: MouseEvent): void => {
        setDragging({ idx: 0 });
    };

    //console.log({ sliderMin, min, max, center, scale, left, right });
    const leftDisplayVal = getValFromPixels(left, sliderMin, scale);
    const leftPercentage = getPercentChange(left, sliderMin, scale, center).toFixed(1);
    const rightDisplayVal = getValFromPixels(right, sliderMin, scale);
    const rightPercentage = getPercentChange(right, sliderMin, scale, center).toFixed(1);

    console.log({ min, leftDisplayVal });

    return (
        <div
            css={rangeSlider(SLIDER_WIDTH)}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
        >
            <div css={track(SLIDER_WIDTH)} ref={trackRef}>
                <div css={slider} style={{ left, width: right - left }}>
                    <div css={dragger} onMouseDown={(e) => onMouseDown(e, 1)} />
                    <div css={dragger} onMouseDown={(e) => onMouseDown(e, 2)} />
                </div>
                <div css={valueMarker} />
            </div>
            <div css={legendContainer}>
                <span style={{ left }}>{`${leftDisplayVal} (${leftPercentage}%)`}</span>
                <span style={{ left: right }}>{`${rightDisplayVal} (${rightPercentage}%)`}</span>
                <span>{center}</span>
            </div>
        </div>
    );
};

export default RangeSlider;
