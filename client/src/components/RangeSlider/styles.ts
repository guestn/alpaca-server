import { css } from '@emotion/core';

export const rangeSlider = (width: number) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    background: 'pink',
    width: width + 40,
    height: 100,
    boxSizing: 'border-box',
  });

export const legendContainer = css({
  position: 'relative',
  // display: "flex",
  // justifyContent: "space-between"
  span: {
    position: 'absolute',
    top: 20,
    //border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    width: 0,
  },
});

export const track = (width: number) =>
  css({
    width,
    height: 2,
    marginTop: 10,
    background: 'black',
    position: 'relative',
  });

export const valueMarker = css({
  height: 50,
  width: 2,
  background: 'black',
  margin: '0 auto',
});

export const slider = css({
  width: 100,
  height: 20,
  top: -9,
  background: '#ddd',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
});

export const dragger = css({
  width: 5,
  height: 20,
  background: 'red',
  cursor: 'ew-resize',
});
