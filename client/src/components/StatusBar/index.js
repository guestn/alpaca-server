/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { object, func } from 'prop-types';
import Icon from '../Icon';

import styles from './styles';


const StatusBar = ({
  connectionStatus,
}) => {
  return (
    <footer css={styles.footer}>
      <div css={styles.statusBlock}>{ connectionStatus.connection ? 'WS:OPEN' : 'WS:CLOSED' }</div>
      <div css={styles.statusBlock}>{ connectionStatus.stream ? `STREAMING: ${connectionStatus.stream.join(', ')}` : 'STREAMING: CLOSED' }</div>
    </footer>
  );
};

StatusBar.propTypes = {
  connectionStatus: object,
};

export default StatusBar;
