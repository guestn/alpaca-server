/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { array, object } from 'prop-types';
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

interface MainContainerProps {
  notifications: [];
  user: {};
}

const MainContainer = (props: MainContainerProps) => {
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    setNotification(props.notifications[0]);
  }, [props.notifications.length]);

  if (!Object.keys(props.user).length) {
    historyPush('/login');
    return (
      <div css={login}>
        <Global styles={global} />
        <Route component={<LoginPage {...props} />} path="/login" exact />
        {notification && <Toast {...notification} />}
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
      {notification && <Toast {...notification} />}
    </div>
  );
};

export default MainContainer;
