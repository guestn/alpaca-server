/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { History } from 'history';
import Button from '../../Button';

import { form, input } from './styles';

interface LoginArgs {
    user: string | null;
    password: string | null;
}

interface LoginFormProps {
    onRequestLogin: ({ user, password }: LoginArgs, history: History) => void;
}

const LoginForm = ({ onRequestLogin }: LoginFormProps) => {
    const [user, setUser] = useState('nicholas.guest@gmail.com');
    const [password, setPassword] = useState('B');
    const history = useHistory()

    useEffect(() => {
        console.log('onRequestLogin');
        onRequestLogin({ user: null, password: null }, history);
    }, []);

    const onClickButton = () => {
        if (!user.length) return;
        onRequestLogin({ user, password }, history);
    };

    return (
        <form css={form}>
            <label htmlFor="login-username">Username</label>
            <input
                autoFocus
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
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={!user.length} label="Sign In" onClick={onClickButton} buttonType="submit" />
        </form>
    );
};

export default LoginForm;
