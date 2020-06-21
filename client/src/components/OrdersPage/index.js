/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { func, string, object } from 'prop-types';
import Orders from '../../containers/Orders';
import Positions from '../../containers/Positions';
import Status from '../../containers/Status';
import Header from '../Header';
import styles from './styles';

const OrdersPage = ({
  clock,
  firebase,
  onRequestClock,
  onRequestLogout,
  user,
}) => {
  return (
    <main css={styles.main}>
      <Header
        user={user}
        clock={clock}
        firebase={firebase}
        onRequestClock={onRequestClock}
        onRequestLogout={onRequestLogout}
      />
      <div css={styles.mainGrid}>
        <Orders />
        <Positions />
      </div>
      <Status />
    </main>
  );
};

OrdersPage.propTypes = {
  clock: object,
  firebase: object,
  onRequestClock: func,
  onRequestLogout: func,
  user: object,
};

export default OrdersPage;
