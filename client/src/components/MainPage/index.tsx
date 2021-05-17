/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import LiveDataBox from './LiveDataBox';
import TradeBox from './TradeBox';
import Orders from '../../containers/Orders';
import Account from '../../containers/Account';
import LiveQuotes from '../../containers/LiveQuotes';
import Status from '../../containers/Status';
import Header from '../Header';
import { main, mainGrid } from './styles';
import { scales } from './helpers';
import CandlestickChart from '../CandlestickChart';
import { Asset, Clock, HistoricalData, LiveData } from '../../redux/reducers/types';
import { getLocalStorage, setLocalStorage } from '../../utils';

interface MainPageProps {
    assets: Asset[];
    clock: Clock;
    liveData: LiveData;
    onCreateOrder: () => void;
    onRequestAssets: () => void;
    onRequestClock: () => void;
    onRequestHistoricalData: ({}) => void;
    onRequestLogout: () => void;
    historicalData: HistoricalData;
    user: object;
}

const MainPage = ({
    assets,
    clock,
    liveData,
    onCreateOrder,
    onRequestAssets,
    onRequestClock,
    onRequestHistoricalData,
    onRequestLogout,
    historicalData,
    user,
}: MainPageProps) => {
    const [ticker, setTicker] = useState('AAPL');
    const [duration, setDuration] = useState(Object.keys(scales)[0]);

    useEffect(() => {
        onRequestHistoricalData({ ...scales[duration], symbols: ticker });
        return () => {};
    }, [ticker]);

    useEffect(() => {
        const alpacaPrefs = getLocalStorage();
        if (alpacaPrefs.currentTicker) {
            setTicker(alpacaPrefs.currentTicker)
        }
    }, [])

    const onRequestTicker = (theTicker: string) => {
        setLocalStorage({currentTicker: theTicker})
        setTicker(theTicker);
        onRequestHistoricalData({ ...scales[duration], symbols: theTicker });
    };

    const onRequestDuration = (theDuration: string) => {
        setDuration(theDuration);
        onRequestHistoricalData({ ...scales[theDuration], symbols: ticker });
    };

    return (
        <main css={main}>
            <Header user={user} clock={clock} onRequestClock={onRequestClock} onRequestLogout={onRequestLogout} />
            <div css={mainGrid}>
                <LiveDataBox liveData={liveData && liveData[ticker]} ticker={ticker} />
                <Orders type="compact" notCanceled />
                <TradeBox onCreateOrder={onCreateOrder} ticker={ticker} />
                <Account />
                <CandlestickChart
                    assets={assets}
                    onRequestAssets={onRequestAssets}
                    onRequestDuration={onRequestDuration}
                    onRequestTicker={onRequestTicker}
                    duration={duration}
                    timeSeriesData={historicalData && historicalData[ticker]}
                    ticker={ticker}
                />
                <LiveQuotes />
            </div>
            <Status />
        </main>
    );
};

export default MainPage;
