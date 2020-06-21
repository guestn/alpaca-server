/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { format, subYears } from 'date-fns';
import { object, string } from 'prop-types';
import Icon from '../../Icon';

import styles from './styles';

const LiveQuoteStreams = ({
  liveQuotes = {},
  ticker,
}) => {
  // const liveData = {
  //   AAPL: {
  //     T: 'AAPL',
  //     c: 314.945,
  //     h: 315.1,
  //     l: 314.9,
  //     o: 314.96,
  //     t: 'Mon May 18 2020 11:55:00 GMT-0700 (Pacific Daylight Time)'
  //   }
  // }
  
  return (
    <section css={styles.container}>
      <table css={styles.table}>
        <thead>
          <tr>
            <td>ticker</td>
            <td>bid</td>
            <td>ask</td>
            <td>x</td>
            <td>low</td>
          </tr>
        </thead>
        {liveQuotes && (
          <tbody>
            { (Object.keys(liveQuotes) || []).map((d) => (
              <tr key={d}>
                <td>{ liveQuotes[d].T }</td>
                <td>{ liveQuotes[d].p }</td>
                <td>{ liveQuotes[d].P }</td>
                <td>{ liveQuotes[d].x }</td>
                <td>{ liveQuotes[d].h }</td>
                <td>{ liveQuotes[d].l }</td>
              </tr>
            ))}

          </tbody>
        )}
      </table>
        {/* <Icon name={`caret-${change}-outline`} /> */}

      {/* { liveData && <p>{ format(new Date(liveData.t * 0.001), 'HH:mm:ss') }</p> } */}

    </section>
  );
};

LiveQuoteStreams.propTypes = {
  liveQuotes: object,
  ticker: string,
};

export default LiveQuoteStreams;
