/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { Fragment } from 'react';
import Status from '../../containers/Status';
import Alerts from '../../containers/Alerts';

import { main, mainGrid } from './styles';

const AlertsPage = () => {
  return (
    <Fragment>
      <main css={main}>
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
