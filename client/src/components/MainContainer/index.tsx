/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import Toast from '../Toast';
import Icon from '../Icon';
import LoginPage from '../LoginPage';
import MainPage from '../MainPage';
import OrdersPage from '../OrdersPage';
import AlertsPage from '../AlertsPage';
import Route from '../../router/Route';
import Link from '../../router/Link';
import { historyPush } from '../../router';
import dispatch from '../../redux/store';
import { app, global, sidebar, logo, login } from './styles';
import { Asset, Clock, HistoricalData, LiveData, Notification, User } from '../../redux/reducers/types';

interface MainContainerProps {
    notifications: Notification[] | null;
    user: User;
    assets: Asset[];
    clock: Clock;
    liveData: LiveData;
    onCreateOrder: () => void;
    onRequestAssets: () => void;
    onRequestClock: () => void;
    onRequestHistoricalData: () => void;
    onRequestLogin: (params: {}) => void;
    onRequestLogout: () => void;
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
    onRequestLogin,
    onRequestLogout,
    historicalData,
    notifications,
    user,
}: MainContainerProps) => {
    const [stateNotification, setStateNotification] = useState(null);
    useEffect(() => {
        setStateNotification((notifications && notifications[0]) || null);
    }, [notifications?.length]);
    console.log({ user });

    if (!user || !Object.keys(user).length) {
        historyPush('/login');
    }

    return (
        <div css={app}>
            <Global styles={global} />
            <aside css={sidebar}>
                <img src="/images/alpaca.svg" alt="Alpaca Logo" css={logo} />
                <Link to="/" active={location.pathname === '/'}>
                    <Icon name="home-outline" />
                </Link>
                <Link to="/orders" active={location.pathname === '/orders'}>
                    <Icon name="book-outline" />
                </Link>
                <Link to="/alerts" active={location.pathname === '/alerts'}>
                    <Icon name="megaphone-outline" />
                </Link>
            </aside>
            <Route
                component={
                    <MainPage
                        onRequestClock={onRequestClock}
                        onRequestAssets={onRequestAssets}
                        user={user}
                        onRequestHistoricalData={onRequestHistoricalData}
                        assets={assets}
                        clock={clock}
                        liveData={liveData}
                        onCreateOrder={onCreateOrder}
                        onRequestLogout={onRequestLogout}
                        historicalData={historicalData}
                    />
                }
                path="/"
                exact
            />
            <Route 
                component={
                     <Route component={<LoginPage user={user} />} path="/login" exact />
                }
                path="/login"
                exact
            />
            <Route
                component={
                    <OrdersPage
                        user={user}
                        onRequestClock={onRequestClock}
                        clock={clock}
                        onRequestLogout={onRequestLogout}
                    />
                }
                path="/orders"
                exact
            />
            <Route
                component={
                    <AlertsPage
                        user={user}
                        onRequestClock={onRequestClock}
                        clock={clock}
                        onRequestLogout={onRequestLogout}
                    />
                }
                path="/alerts"
                exact
            />
            {stateNotification && <Toast {...stateNotification} />}
        </div>
    );
};

export default MainContainer;
