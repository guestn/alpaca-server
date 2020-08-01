/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState, Fragment } from 'react';
import AlertItem from '../AlertItem';
import Button from '../../Button';
import { cachedDataVersionTag } from 'v8';

interface AlertsBoxProps {
  alerts: [];
  onRequestAlerts: () => void;
}

const AlertsBox = ({
  alerts = [],
  assets,
  onRequestAlerts,
  historicalData,
  onRequestHistoricalData,
  onRequestAssets,
  onPostAlert,
  onDeleteAlert,
}: AlertsBoxProps) => {
  const [showNew, setShowNew] = useState(false);
  useEffect(() => {
    onRequestAlerts();
  }, []);
  console.log({ alerts });
  console.log({ showNew });
  const onRequestPostAlert = (data) => {
    onPostAlert(data);
    setShowNew(false);
  };
  //if (alerts.length === 0) {
  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alertItem) => (
          <AlertItem
            ticker={alertItem.ticker}
            low={alertItem.low}
            high={alertItem.high}
            mid={alertItem.mid}
            createdAt={alertItem.createdAt}
            assets={assets}
            historicalData={historicalData}
            onRequestAssets={onRequestAssets}
            onRequestHistoricalData={onRequestHistoricalData}
            onPostAlert={onRequestPostAlert}
            onDeleteAlert={onDeleteAlert}
            id={alertItem.id}
          />
        ))}
      {showNew ? (
        <AlertItem
          //ticker={alertItem.ticker}
          //data={JSON.parse(alertItem.data)}
          assets={assets}
          historicalData={historicalData}
          onRequestAssets={onRequestAssets}
          onRequestHistoricalData={onRequestHistoricalData}
          onPostAlert={onRequestPostAlert}
          onDeleteAlert={() => setShowNew(false)}
          isNew
          //onRequestTicker={onRequestTicker}
        />
      ) : (
        <Button label="Create New" onClick={() => setShowNew(true)} />
      )}
    </Fragment>
  );
  //}
  return <Fragment></Fragment>;
};

export default AlertsBox;
