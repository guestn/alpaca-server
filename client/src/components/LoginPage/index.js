/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { object } from 'prop-types';
import Login from '../../containers/Login';
import styles from './styles';

const LoginPage = ({
  firebase,
}) => (
  <main css={styles.main}>
    <img src="/images/alpaca.svg" alt="Alpaca Logo" css={styles.logo} />
    <section css={styles.loginContainer}>
      <h2>welcome! sign in</h2>
      <Login firebase={firebase} />
    </section>
  </main>
);

LoginPage.propTypes = {
  firebase: object,
};

export default LoginPage;
