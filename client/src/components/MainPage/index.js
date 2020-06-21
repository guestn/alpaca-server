/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { func, object } from 'prop-types';
import LiveDataBox from './LiveDataBox';
import TradeBox from './TradeBox';
import Orders from '../../containers/Orders';
import Account from '../../containers/Account/index.tsx';
import LiveQuotes from '../../containers/LiveQuotes';
import Status from '../../containers/Status';
import Header from '../Header';
import styles from './styles';
import { scales } from './helpers';
import CandlestickChart from '../CandlestickChart';

const MainPage = ({
  assets,
  clock,
  firebase,
  liveData,
  onCreateOrder,
  onRequestAssets,
  onRequestClock,
  onRequestHistoricalData,
  onRequestLogout,
  historicalData,
  user,
}) => {
  const [ticker, setTicker] = useState('AAPL');
  const [duration, setDuration] = useState(Object.keys(scales)[0]);

  useEffect(() => {
    onRequestHistoricalData({ ...scales[duration], symbols: ticker });
    return () => {};
  }, [ticker]);

  const onRequestTicker = (theTicker) => {
    setTicker(theTicker);
    console.log({ hello: theTicker });
    
    onRequestHistoricalData({ ...scales[duration], symbols: theTicker });
  };

  const onRequestDuration = (theDuration) => {
    setDuration(theDuration);
    onRequestHistoricalData({ ...scales[theDuration], symbols: ticker });
  };

  return (
    <main css={styles.main}>
      <Header
        user={user}
        clock={clock}
        firebase={firebase}
        onRequestClock={onRequestClock}
        onRequestLogout={onRequestLogout}
      />
      <div css={styles.mainGrid}>
        <LiveDataBox liveData={liveData && liveData[ticker]} ticker={ticker} />
        <Orders type="compact" />
        <TradeBox
          onCreateOrder={onCreateOrder}
          ticker={ticker}
        />
        <Account />
        <CandlestickChart
          assets={assets}
          onRequestAssets={onRequestAssets}
          onRequestDuration={onRequestDuration}
          onRequestTicker={onRequestTicker}
          duration={duration}
          timeSeriesData={historicalData[ticker]}
          ticker={ticker}
        />
        <LiveQuotes />
      </div>
      <Status />
    </main>
  );
};

MainPage.propTypes = {
  clock: object,
  firebase: object,
  liveData: object,
  onCreateOrder: func,
  onRequestClock: func,
  onRequestHistoricalData: func,
  onRequestLogout: func,
  historicalData: object,
  user: object,
};

export default MainPage;
