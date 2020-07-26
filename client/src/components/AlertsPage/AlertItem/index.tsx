/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState, Fragment } from 'react';
import { container } from './styles.ts';
import RangeSlider from '../../RangeSlider';
import TickerSelector from '../../MainPage/TickerSelector';
import Button from '../../Button';
import { scales } from '../../MainPage/helpers';
import { uuid } from 'uuidv4';
import { cachedDataVersionTag } from 'v8';
interface AlertItemProps {
  assets: [];
  historicalData: { [ticker: string]: [{ c: number }] };
  onRequestAssets: () => void;
  onRequestTicker: () => void;
  onRequestHistoricalData: ({}) => void;
  onPostAlert: ({}) => void;
  onDeleteAlert: (id: number) => void;
  ticker: string;
  low: number;
  high: number;
  isNew: boolean;
  id: string;
}

const AlertItem = ({
  assets = [],
  historicalData = {},
  onRequestAssets,
  onRequestHistoricalData,
  onPostAlert,
  onDeleteAlert,
  ticker,
  low,
  high,
  isNew,
  id,
}: AlertItemProps) => {
  console.log('ddd', historicalData[ticker]);
  const [lastPrice, setLastPrice] = useState(0);

  useEffect(() => {
    const lp = historicalData[ticker] && historicalData[ticker][0].c;
    setLastPrice(lp);
  }, [historicalData]);

  const [theTicker, setTicker] = useState(ticker || 'AAPL');
  console.log('item', low, high);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    onRequestHistoricalData({ ...scales.DAY, symbols: ticker });
    return () => {};
  }, [theTicker]);

  const onChangeSlider = (low: number, high: number) => {
    setMin(low);
    setMax(high);
  };

  const onRequestTicker = (theTicker: string) => setTicker(theTicker);
  console.log({ min, max, lastPrice });
  return (
    <section css={container}>
      <RangeSlider
        min={low || lastPrice * 0.9}
        max={high || lastPrice * 1.1}
        center={lastPrice}
        onChangeSlider={onChangeSlider}
      />
      {isNew ? (
        <TickerSelector
          assets={assets}
          onRequestAssets={onRequestAssets}
          onRequestTicker={onRequestTicker}
          ticker={theTicker}
        />
      ) : (
        ticker
      )}
      <div>{lastPrice}</div>
      <Button
        label={isNew ? 'Save Alert' : 'Update Alert'}
        onClick={() => onPostAlert({ ticker: theTicker, low: min, high: max, id: id || uuid(), mid: lastPrice })}
      />
      <Button label={isNew ? 'Cancel' : 'Delete'} onClick={() => onDeleteAlert(id)} />
    </section>
  );
};

export default AlertItem;
