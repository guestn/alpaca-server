/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useHistory, useLocation } from 'react-router-dom';
import { History } from 'history';
import { Clock, User } from '../../redux/reducers/types';
import Icon from '../Icon';
import MarketClock from '../MarketClock';

import styles from './styles';

interface HeaderProps {
    clock: Clock | null;
    onRequestClock: () => void;
    onRequestLogout: ({ history }: { history: History }) => void;
    user: User | undefined;
}

const Header = ({ clock = null, onRequestClock, onRequestLogout, user }: HeaderProps) => {
    const history = useHistory();
    const location = useLocation();

    if (location.pathname === '/login') return null;

    return (
        <header css={styles.header}>
            <MarketClock clock={clock} onRequestClock={onRequestClock} />
            <div css={styles.loginStatus}>
                <Icon name="person-circle-outline" />
                <span css={styles.displayName}>{user && user.name}</span>
                <Icon onClick={() => onRequestLogout({ history })} name="log-out-outline" hoverable />
            </div>
        </header>
    );
};

export default Header;
