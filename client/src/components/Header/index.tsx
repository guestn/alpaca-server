/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Icon from '../Icon';
import MarketClock from '../MarketClock';

import styles from './styles';

interface HeaderProps {
  clock: {};
  onRequestClock: () => void;
  onRequestLogout: () => void;
  user: {};
}

const Header = ({ clock = null, onRequestClock, onRequestLogout, user }: HeaderProps) => {
  return (
    <header css={styles.header}>
      <MarketClock clock={clock} onRequestClock={onRequestClock} />
      <div css={styles.loginStatus}>
        <Icon name="person-circle-outline" />
        <span css={styles.displayName}>{user && user.name}</span>
        <Icon onClick={() => onRequestLogout()} name="log-out-outline" hoverable />
      </div>
    </header>
  );
};

export default Header;
