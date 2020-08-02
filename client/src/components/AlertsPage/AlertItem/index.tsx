/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { container, buttonContainer } from './styles';
import RangeSlider from '../../RangeSlider';
import TickerSelector from '../../MainPage/TickerSelector';
import Button from '../../Button';
import { scales } from '../../MainPage/helpers';
import { uuid } from 'uuidv4';
import { format } from 'date-fns';
export interface AlertItemProps {
  assets: [];
  historicalData: { [ticker: string]: [{ c: number }] };
  onRequestAssets: () => void;
  onRequestHistoricalData: ({}) => void;
  onPostAlert: (data: OnPostAlertArgs) => void;
  onDeleteAlert: (id: string) => void;
  ticker?: string;
  low?: number;
  high?: number;
  mid?: number;
  isNew?: boolean;
  id?: string;
  createdAt?: string;
  lowSent?: string;
  highSent?: string;
}

export interface OnPostAlertArgs {
  ticker: string;
  low: number;
  high: number;
  id: string;
  mid: number;
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
  mid,
  isNew,
  createdAt,
  lowSent,
  highSent,
  id,
}: AlertItemProps) => {
  const [lastPrice, setLastPrice] = useState(0);
  const [theTicker, setTicker] = useState(ticker || 'AAPL');
  const [updateEnabled, setUpdateEnabled] = useState(false);

  useEffect(() => {
    const lp = historicalData[theTicker] && historicalData[theTicker].length && historicalData[theTicker][0].c;
    setLastPrice(lp);
  }, [historicalData]);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    onRequestHistoricalData({ ...scales.DAY, symbols: theTicker });
    return () => {};
  }, [theTicker]);

  const onChangeSlider = (low: number, high: number, enableUpdate: boolean) => {
    setMin(low);
    setMax(high);
    setUpdateEnabled(enableUpdate);
  };

  const onRequestTicker = (theTicker: string) => setTicker(theTicker);

  return (
    <section css={container}>
      <RangeSlider
        min={low || lastPrice * 0.9}
        max={high || lastPrice * 1.1}
        center={lastPrice}
        onChangeSlider={onChangeSlider}
      />
      <div>
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
        {!isNew && <div>{`This alert was set when price was ${mid}`}</div>}
        {!isNew && <div>{`created: ${format(new Date(createdAt), 'MM/dd HH:mm:ss')}`}</div>}
        {lowSent && <div>{`LOW triggered at ${format(new Date(lowSent), 'MM/dd HH:mm:ss')}`}</div>}
        {highSent && <div>{`HIGH triggered at ${format(new Date(highSent), 'MM/dd HH:mm:ss')}`}</div>}
      </div>
      <div css={buttonContainer}>
        <Button
          disabled={!updateEnabled}
          label={isNew ? 'Save Alert' : 'Update Alert'}
          onClick={() => onPostAlert({ ticker: theTicker, low: min, high: max, id: id || uuid(), mid: lastPrice })}
        />
        <Button label={isNew ? 'Cancel' : 'Delete'} onClick={() => onDeleteAlert(id)} />
      </div>
    </section>
  );
};

export default AlertItem;
