/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { array, string, func } from 'prop-types';
import ResizeDetector from 'react-resize-detector';
import Button from '../Button';
import d3Utils from './utils';
import spacing from '../../styles/spacing';
import { scales } from '../MainPage/helpers';
import styles from './styles';
import TickerSelector from '../MainPage/TickerSelector';


const CandlestickChart = ({
  assets,
  duration,
  onRequestAssets,
  onRequestDuration,
  onRequestTicker,
  timeSeriesData = [],
  ticker,
}) => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const onResize = (width, height) => setDimensions({ width, height });

  useEffect(() => {
    if (dimensions.width > 0 && timeSeriesData.length) {
      d3Utils.empty();
      d3Utils.initializeChart({ timeSeriesData, dimensions, duration });
    }
  }, [timeSeriesData, dimensions.width, dimensions.height]);

  return (
    <div css={styles.container}>
      <header css={styles.header}>
        <TickerSelector
          ticker={ticker}
          assets={assets}
          onRequestTicker={onRequestTicker}
          onRequestAssets={onRequestAssets}
        />
        <div css={styles.buttonContainer}>
          { Object.keys(scales).map((scale) => (
            <Button
              active={scale === duration}
              label={scale}
              type="invisible"
              key={scale}
              onClick={() => onRequestDuration(scale)}
            />
          ))}
        </div>
      </header>
      <div css={styles.graphContainer}>
        <svg
          className="line-chart"
          width={dimensions.width}
          height={dimensions.height - spacing.unit * 2}
          css={styles.svg}
        />
        <ResizeDetector
          handleWidth
          handleHeight
          onResize={onResize}
        />
      </div>
    </div>
  );
};

CandlestickChart.propTypes = {
  assets: array,
  duration: string,
  onRequestAssets: func,
  onRequestDuration: func,
  onRequestTicker: func,
  timeSeriesData: array,
  ticker: string,
};

export default CandlestickChart;
