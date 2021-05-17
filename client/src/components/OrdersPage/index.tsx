/** @jsx jsx */
import { jsx } from '@emotion/core';
import Orders from '../../containers/Orders';
import Positions from '../../containers/Positions';
import Status from '../../containers/Status';
import { Clock, User } from '../../redux/reducers/types';
import Header from '../Header';
import styles from './styles';

interface OrdersPageProps {
    clock: Clock;
    onRequestClock: () => void;
    onRequestLogout: () => void;
    user: User;
}

const OrdersPage = ({ clock, onRequestClock, onRequestLogout, user }: OrdersPageProps) => {
    return (
        <main css={styles.main}>
            <Header user={user} clock={clock} onRequestClock={onRequestClock} onRequestLogout={onRequestLogout} />
            <div css={styles.mainGrid}>
                <Orders />
                <Positions />
            </div>
            <Status />
        </main>
    );
};

export default OrdersPage;
