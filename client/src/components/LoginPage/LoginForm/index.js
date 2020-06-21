/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { func, object } from 'prop-types';
import Button from '../../Button';

import styles from './styles';


const LoginForm = ({
  onRequestLogin,
  firebase,
}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('onRequestLogin');
    
    onRequestLogin({ user: null, password: null, firebase });
  }, []);
  
  const onClickButton = () => {
    if (!user.length) return;
    onRequestLogin({ user, password, firebase });
  };

  return (
    <fieldset css={styles.form}>
      <label htmlFor="login-username">Username</label>
      <input
        css={styles.input}
        type="text"
        placeholder="enter username"
        id="login-username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <label htmlFor="login-password">Password</label>
      <input
        css={styles.input}
        type="password"
        placeholder="enter password"
        id="login-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        disabled={!user.length}
        label="Sign In"
        onClick={onClickButton}
      />
    </fieldset>
  );
};

LoginForm.propTypes = {
  firebase: object,
  onRequestLogin: func,
};

export default LoginForm;
