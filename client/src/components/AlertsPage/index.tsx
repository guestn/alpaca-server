/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState, Fragment } from 'react';
import { func, string, object } from 'prop-types';
import Orders from '../../containers/Orders';
import Positions from '../../containers/Positions';
import Status from '../../containers/Status';
import Header from '../Header';
import styles from './styles';
import RangeSlider from '../RangeSlider';
import AlertItem from './AlertItem';

const AlertsPage = ({ assets, onRequestAssets, onRequestHistoricalData, historicalData }) => {
  // const onRequestTicker = (ticker: string) => {
  //   console.log(t);
  // };
  return (
    <Fragment>
      <main css={styles.main}>
        <div css={styles.mainGrid}>
          <AlertItem
            assets={assets}
            historicalData={historicalData}
            onRequestAssets={onRequestAssets}
            onRequestHistoricalData={onRequestHistoricalData}
            //onRequestTicker={onRequestTicker}
          />
        </div>
        <Status />
      </main>
      <Status />
    </Fragment>
  );
};

AlertsPage.propTypes = {
  clock: object,
  firebase: object,
  onRequestClock: func,
  onRequestLogout: func,
  user: object,
};

export default AlertsPage;
