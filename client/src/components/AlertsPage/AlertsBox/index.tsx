/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState, Fragment } from 'react';
import AlertItem from '../AlertItem';
import Button from '../../Button';
import { AlertItemProps, OnPostAlertArgs } from '../AlertItem';
interface AlertsBoxProps {
  alerts: [];
  assets: [];
  onRequestAlerts: () => void;
  historicalData: {};
  onRequestHistoricalData: () => void;
  onRequestAssets: () => void;
  onPostAlert: (data: OnPostAlertArgs) => void;
  onDeleteAlert: () => void;
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
  const onRequestPostAlert = (data: OnPostAlertArgs) => {
    onPostAlert(data);
    setShowNew(false);
  };
  //if (alerts.length === 0) {
  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alertItem: AlertItemProps) => (
          <AlertItem
            assets={assets}
            createdAt={alertItem.createdAt}
            high={alertItem.high}
            highSent={alertItem.highSent}
            historicalData={historicalData}
            id={alertItem.id}
            low={alertItem.low}
            lowSent={alertItem.lowSent}
            mid={alertItem.mid}
            onDeleteAlert={onDeleteAlert}
            onPostAlert={onRequestPostAlert}
            onRequestAssets={onRequestAssets}
            onRequestHistoricalData={onRequestHistoricalData}
            ticker={alertItem.ticker}
            key={alertItem.id}
          />
        ))}
      {showNew ? (
        <AlertItem
          assets={assets}
          historicalData={historicalData}
          isNew
          onDeleteAlert={() => setShowNew(false)}
          onPostAlert={onRequestPostAlert}
          onRequestAssets={onRequestAssets}
          onRequestHistoricalData={onRequestHistoricalData}
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
