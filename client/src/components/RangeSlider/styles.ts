/** @jsx jsx */
import { css, SerializedStyles } from '@emotion/core';


import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import tables from '../../styles/tables';


const styles = {
  ...typography,
  range: {
    width: 300,
    height: 22,
    overflow: 'hidden',
    cursor: 'pointer',
    outline: 'none',
    '::-webkit-slider-runnable-track, ::-webkit-slider-thumb': {
      '-webkit-appearance': 'none',
      background: 'none',
      cursor: 'ew-resize',
    },
    '::-webkit-slider-runnable-track': {
      width: 300,
      height: 3,
      background: 'pink'
    },
    ':nth-child(2)::-webkit-slider-runnable-track': {
      background: 'none',
    },
    '::-webkit-slider-thumb': {
      position: 'relative',
      height: 22,
      width: 5,
      marginTop: -10,
      background: 'red',
      zIndex: 1,
      boxShadow: '-300px 0 0 300px pink',
    },
    ':nth-child(1)::-webkit-slider-thumb': {
      zIndex: 2,
      boxShadow: '-300px 312px 0 300px white, -300px -313px 0 300px white',
    },
  },
  rangeSlider: {
    position: 'relative',
    height: 60,
    width: 300,
    display: 'inline-block',
    marginTop: -5,
    marginLeft: 20,

    input: {
      position: 'absolute',
    },

    span: {
      position: 'absolute',
      marginTop: 30,
      left: 0,
      
    },
    right: {
      position: 'relative',
      float: 'right',
      marginRight: -5,
    },
  },
};

export default styles;
