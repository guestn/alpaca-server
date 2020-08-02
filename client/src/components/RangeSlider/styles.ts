import { css } from '@emotion/core';
import { relative } from 'path';
import spacing from '../../styles/spacing';

export const rangeSlider = (width: number) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    width: width + 40,
    height: 130,
    boxSizing: 'border-box',
  });

export const legendContainer = css({
  position: 'relative',
  span: {
    position: 'absolute',
    top: 20,
    display: 'flex',
    justifyContent: 'center',
    width: 0,
    textAlign: 'center',
    '&:last-of-type': {
      left: 0,
      right: 0,
      fontSize: 20,
      top: 50,
      margin: '0 auto',
    },
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
  height: spacing.unit * 6,
  width: 0,
  borderLeft: '2px dashed black',
  top: -20,
  margin: '0 auto',
  position: 'relative',
});

export const slider = css({
  width: 100,
  height: spacing.unit * 4,
  top: -14,
  background: 'rgba(155,155,155,0.5)',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
});

export const dragger = css({
  width: 5,
  height: spacing.unit * 4,
  background: 'red',
  cursor: 'ew-resize',
});
