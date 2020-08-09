/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { func, object } from 'prop-types';
import Button from '../../Button';

import { form, input } from './styles';

interface LoginArgs {
  user: string | null;
  password: string | null;
}

interface LoginFormProps {
  onRequestLogin: ({ user, password }: LoginArgs) => void;
}

const LoginForm = ({ onRequestLogin }: LoginFormProps) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('onRequestLogin');

    onRequestLogin({ user: null, password: null });
  }, []);

  const onClickButton = () => {
    if (!user.length) return;
    onRequestLogin({ user, password });
  };

  return (
    <fieldset css={form}>
      <label htmlFor="login-username">Username</label>
      <input
        css={input}
        type="text"
        placeholder="enter username"
        id="login-username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <label htmlFor="login-password">Password</label>
      <input
        css={input}
        type="password"
        placeholder="enter password"
        id="login-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={!user.length} label="Sign In" onClick={onClickButton} />
    </fieldset>
  );
};

LoginForm.propTypes = {
  onRequestLogin: func,
};

export default LoginForm;
