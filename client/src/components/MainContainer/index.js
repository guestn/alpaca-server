/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { array, object } from 'prop-types';
import Toast from '../Toast/index.tsx';
import styles from './styles';
import Icon from '../Icon';
import LoginPage from '../LoginPage';
import MainPage from '../MainPage';
import OrdersPage from '../OrdersPage';

import Route from '../../router/Route';
import Link from '../../router/Link';
import { historyPush } from '../../router';


const MainContainer = (props) => {
  
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    setNotification(props.notifications[0]);
  }, [props.notifications.length]);

  if (!Object.keys(props.user).length) { 
    historyPush('/login');
    return (
      <div css={styles.login}>
        <Global styles={styles.global} />
        <Route component={<LoginPage {...props} />} path="/login" exact />
        { notification
        && <Toast {...notification} /> }
      </div>
    );
  }

  return (
    <div css={styles.app}>
      <Global styles={styles.global} />
      <aside css={styles.sidebar}>
        <img src="/images/alpaca.svg" alt="Alpaca Logo" css={styles.logo} />
        <Link to="/" active={location.pathname === '/'}><Icon name="home-outline" /></Link>
        <Link to="/orders" active={location.pathname === '/orders'}><Icon name="book-outline" /></Link>
      </aside>
      <Route component={<MainPage {...props} />} path="/" exact />
      <Route component={<OrdersPage {...props} />} path="/orders" exact />
      { notification
        && <Toast {...notification} /> }
    </div>
  );
};

MainContainer.propTypes = {
  notifications: array,
  user: object,
};

export default MainContainer;
