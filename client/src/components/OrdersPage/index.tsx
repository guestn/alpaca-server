/** @jsx jsx */
import { jsx } from '@emotion/core';
import Orders from '../../containers/Orders';
import Positions from '../../containers/Positions';
import Status from '../../containers/Status';
import styles from './styles';


const OrdersPage = () => {
    return (
        <main css={styles.main}>
            <div css={styles.mainGrid}>
                <Orders />
                <Positions />
            </div>
            <Status />
        </main>
    );
};

export default OrdersPage;
