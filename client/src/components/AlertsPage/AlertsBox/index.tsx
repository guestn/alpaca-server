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
            lowSent={alertItem.lowSent}
            highSent={alertItem.highSent}
          />
        ))}
      {showNew ? (
        <AlertItem
          assets={assets}
          historicalData={historicalData}
          onRequestAssets={onRequestAssets}
          onRequestHistoricalData={onRequestHistoricalData}
          onPostAlert={onRequestPostAlert}
          onDeleteAlert={() => setShowNew(false)}
          isNew
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
