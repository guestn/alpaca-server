/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icon';
import { sidebar, logo } from './styles';

const SideBar = () => {
    const location = useLocation();

    if (location.pathname === '/login') return null;

    return (
        <aside css={sidebar}>
            <img src="/images/alpaca.svg" alt="Alpaca Logo" css={logo} />
            <Link to="/">
                <Icon name="home-outline" />
            </Link>
            <Link to="/orders">
                <Icon name="book-outline" />
            </Link>
            <Link to="/alerts">
                <Icon name="megaphone-outline" />
            </Link>
        </aside>
    );
};

export default SideBar;
