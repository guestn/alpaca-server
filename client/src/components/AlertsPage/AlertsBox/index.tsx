/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import AlertItem from '../AlertItem';
import Button from '../../Button';
import { OnPostAlertArgs } from '../AlertItem';
import { Alert, Asset, HistoricalData } from '../../../redux/reducers/types';
interface AlertsBoxProps {
    alerts: Alert[];
    assets: Asset[];
    onRequestAlerts: () => void;
    historicalData: HistoricalData;
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
                alerts.map((alertItem) => (
                    <AlertItem
                        assets={assets}
                        createdAt={alertItem.createdAt}
                        high={parseFloat(alertItem.high)}
                        highSent={alertItem.highSent}
                        historicalData={historicalData}
                        id={alertItem.id}
                        low={parseFloat(alertItem.low)}
                        lowSent={alertItem.lowSent}
                        mid={parseFloat(alertItem.mid)}
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
                    id="1234"
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
