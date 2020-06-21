/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, Fragment } from 'react';
import { func, object } from 'prop-types';
import { format } from 'date-fns';
import Icon from '../Icon';

import styles from './styles';


const MarketClock = ({
  clock = null,
  onRequestClock,
}) => {
  useEffect(() => {
    onRequestClock();
    return () => {};
  }, []);
  return (
    <section css={styles.marketClock}>
      <Icon name="time-outline" />
      { clock && (
        <Fragment>
          <div css={styles.statusText}>{ clock.is_open ? 'Market Open' : 'Market Closed' }</div>
          <div title="Next Open">
            <Icon name="sunny-outline" />
            <span css={styles.statusText}>{ format(new Date(clock.next_open), 'dd MMM HH:mm') }</span>
          </div>
          <div title="Next Close">
            <Icon name="moon-outline" />
            <span css={styles.statusText}>{ format(new Date(clock.next_close), 'dd MMM HH:mm') }</span>
          </div>
        </Fragment>
      )}
      
    </section>
  );
}

MarketClock.propTypes = {
  clock: object,
  onRequestClock: func,
};

export default MarketClock;
