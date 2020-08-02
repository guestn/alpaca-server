/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { Fragment } from 'react';
import Status from '../../containers/Status';
import Alerts from '../../containers/Alerts';
import Header from '../../components/Header';

import { main, mainGrid } from './styles';

interface AlertsPageProps {
  user: {};
  clock: {};
  onRequestClock: () => void;
  onRequestLogout: () => void;
}

const AlertsPage = (props: AlertsPageProps) => {
  return (
    <Fragment>
      <main css={main}>
        <Header
          user={props.user}
          clock={props.clock}
          onRequestClock={props.onRequestClock}
          onRequestLogout={props.onRequestLogout}
        />
        <div css={mainGrid}>
          <Alerts />
        </div>
        <Status />
      </main>
      <Status />
    </Fragment>
  );
};

export default AlertsPage;
