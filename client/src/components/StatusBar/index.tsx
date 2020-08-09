/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { object, func } from 'prop-types';

import { footer, statusBlock } from './styles';

interface StatusBarProps {
  connectionStatus: { connection: string; stream: [] };
}

const StatusBar = ({ connectionStatus }: StatusBarProps) => {
  return (
    <footer css={footer}>
      <div css={statusBlock}>{connectionStatus.connection ? 'WS:OPEN' : 'WS:CLOSED'}</div>
      <div css={statusBlock}>
        {connectionStatus.stream ? `STREAMING: ${connectionStatus.stream.join(', ')}` : 'STREAMING: CLOSED'}
      </div>
    </footer>
  );
};

StatusBar.propTypes = {
  connectionStatus: object,
};

export default StatusBar;
