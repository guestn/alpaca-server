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

import { app, global, sidebar, logo, login } from './styles';
import { Notification } from '../../redux/reducers/types';

interface MainContainerProps {
    notifications: Notification[] | null;
    user: {};
}

const MainContainer = ({ notifications, user }: MainContainerProps) => {
    const [stateNotification, setStateNotification] = useState(null);
    useEffect(() => {
        setStateNotification(notifications?[0] || null);
    }, [notifications?.length]);

    if (!Object.keys(user).length) {
        historyPush('/login');
        return (
            <div css={login}>
                <Global styles={global} />
                <Route component={<LoginPage {...props} />} path="/login" exact />
                {stateNotification && <Toast {...stateNotification} />}
            </div>
        );
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
            <Route component={<MainPage {...props} />} path="/" exact />
            <Route component={<OrdersPage {...props} />} path="/orders" exact />
            <Route component={<AlertsPage {...props} />} path="/alerts" exact />
            {stateNotification && <Toast {...stateNotification} />}
        </div>
    );
};

export default MainContainer;
