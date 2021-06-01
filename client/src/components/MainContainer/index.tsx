/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import { useEffect, useState, SetStateAction } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import Toast from '../Toast';
import Header from '../Header';
import SideBar from '../SideBar';
import LoginPage from '../LoginPage';
import MainPage from '../MainPage';
import OrdersPage from '../OrdersPage';
import AlertsPage from '../AlertsPage';
import { Asset, Clock, HistoricalData, LiveData, Notification, User } from '../../redux/reducers/types';
import { GetHistoricalDataParams } from '../../redux/actions/getHistoricalData';
import { CreateOrderParams } from '../../redux/actions/createOrder';
import { app, global } from './styles';

interface MainContainerProps {
    notifications: Notification[] | null;
    user: User | null;
    assets: Asset[];
    clock: Clock | null;
    liveData: LiveData | null;
    onCreateOrder: (params: CreateOrderParams) => void;
    onRequestAssets: () => void;
    onRequestClock: () => void;
    onRequestHistoricalData: (params: GetHistoricalDataParams) => void;
    onRequestLogout: ({ history }: { history: History }) => void;
    historicalData: HistoricalData;
}

const MainContainer = ({
    assets,
    clock,
    liveData,
    onCreateOrder,
    onRequestAssets,
    onRequestClock,
    onRequestHistoricalData,
    onRequestLogout,
    historicalData,
    notifications,
    user,
}: MainContainerProps) => {
    const [stateNotification, setStateNotification] = useState<SetStateAction<Notification | null>>(null);
    useEffect(() => {
        if (notifications) {
            setStateNotification(notifications[0] || null);
        }
    }, [notifications?.length]);

    if (!user || !Object.keys(user).length) {
        createBrowserHistory().push('/login');
    }

    return (
        <div css={app}>
            <Global styles={global} />
            <BrowserRouter>
                <SideBar />
                <Header user={user || undefined} clock={clock} onRequestClock={onRequestClock} onRequestLogout={onRequestLogout} />
                <Switch>
                    <Route
                        render={() => (
                            <MainPage
                                onRequestAssets={onRequestAssets}
                                onRequestHistoricalData={onRequestHistoricalData}
                                assets={assets}
                                liveData={liveData}
                                onCreateOrder={onCreateOrder}
                                historicalData={historicalData}
                            />
                        )}
                        path="/"
                        exact
                    />
                    <Route
                        render={() => <Route render={() => <LoginPage />} path="/login" exact />}
                        path="/login"
                        exact
                    />
                    <Route render={() => <OrdersPage />} path="/orders" exact />
                    <Route render={() => <AlertsPage />} path="/alerts" exact />
                </Switch>
            </BrowserRouter>
            {stateNotification && (
                <Toast
                    noteType={stateNotification.noteType || ''}
                    message={stateNotification.message}
                />
            )}
        </div>
    );
};

export default MainContainer;
