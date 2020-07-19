/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState, Fragment } from 'react';
import { container } from './styles.ts';
import RangeSlider from '../../RangeSlider';
import TickerSelector from '../../MainPage/TickerSelector';
import Button from '../../Button';
import { scales } from '../../MainPage/helpers';

interface AlertItemProps {
  assets: [];
  historicalData: { [ticker: string]: [{}] };
  onRequestAssets: () => void;
  onRequestTicker: () => void;
  onRequestHistoricalData: ({}) => void;
}

const AlertItem = ({ assets = [], historicalData, onRequestAssets, onRequestHistoricalData }: AlertItemProps) => {
  const [ticker, setTicker] = useState('AAPL');
  useEffect(() => {
    onRequestHistoricalData({ ...scales.DAY, symbols: ticker });
    return () => {};
  }, [ticker]);
  console.log({ c: historicalData[ticker] && historicalData[ticker][0].c });
  const lastPrice = historicalData[ticker] && historicalData[ticker][0].c;

  const onRequestTicker = (theTicker: string) => setTicker(theTicker);

  return (
    <section css={container}>
      <RangeSlider min={lastPrice - 30} max={lastPrice + 30} center={lastPrice} />
      <TickerSelector
        assets={assets}
        onRequestAssets={onRequestAssets}
        onRequestTicker={onRequestTicker}
        ticker="AAPL"
      />
      <div>{lastPrice}</div>
      <Button label="Save Alert" />
    </section>
  );
};

export default AlertItem;
