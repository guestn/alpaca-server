/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Login from '../../containers/Login';
import { loginContainer, logo, main } from './styles';

const LoginPage = ({}) => (
    <main css={main}>
        <div>
            <img src="/images/alpaca.svg" alt="Alpaca Logo" css={logo} />
        </div>

        <section css={loginContainer}>
            <h2>welcome! sign in</h2>
            <Login />
        </section>
    </main>
);

export default LoginPage;
