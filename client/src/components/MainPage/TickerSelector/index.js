/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect } from 'react';
import Select from 'react-select';
import { func, array, string } from 'prop-types';


import styles from './styles';

const TickerSelector = ({
  assets,
  onRequestAssets,
  onRequestTicker,
  ticker,
}) => {
  useEffect(() => {
    onRequestAssets();
  }, []);

  return (
    <form css={styles.container}>
      <Select
        styles={styles.select}
        value={{ label: ticker, value: 0 }}
        options={assets.map((a, idx) => ({ label: a.symbol, value: idx }))}
        onChange={(opt) => onRequestTicker(opt.label)}
      />
    </form>
  );
};

TickerSelector.propTypes = {
  assets: array,
  onRequestAssets: func,
  onRequestTicker: func,
  ticker: string,
};

export default TickerSelector;
