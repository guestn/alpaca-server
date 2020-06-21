/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { array } from 'prop-types';
import ResizeDetector from 'react-resize-detector';
import d3Utils from './utils';
import spacing from '../../styles/spacing';
import styles from './styles';

const Linegraph = ({ timeSeriesData = [] }) => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const onResize = (width, height) => setDimensions({ width, height });

  useEffect(() => {
    if (dimensions.width > 0 && timeSeriesData.length) {
      d3Utils.empty();
      d3Utils.initializeChart({ data: timeSeriesData, dimensions });
    }
  }, [timeSeriesData.length, dimensions.width, dimensions.height]);

  return (
    <div css={styles.container}>
      <header css={styles.header}>
        <h3>Jobcoin History Graph</h3>
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

Linegraph.propTypes = {
  timeSeriesData: array,
};

export default Linegraph;
