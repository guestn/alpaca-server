/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import { useInterval } from '../../utils';
import { format } from 'date-fns';

import styles from './styles';
import { Order } from '../../redux/reducers/types';
import Icon from '../Icon';
import Button from '../Button';

interface OrdersBoxProps {
    notCanceled: boolean;
    orders: Order[];
    type: string;
    onCancelOrder: (id: string) => void;
    onRequestOrders: () => void;
}

const fillStatus = (o: Order) => {
    if (o.status === 'canceled') return '';
    return o.filled_at ? `${o.filled_qty} / ${o.filled_avg_price}` : 'pending';
};

const OrdersBox = ({ orders, onCancelOrder, onRequestOrders, type, notCanceled }: OrdersBoxProps) => {
    const [cancelledFilter, setCancelledFilter] = useState(false);

    let title = 'Waiting';
    useEffect(() => {
        onRequestOrders();
    }, []);

    useInterval(() => {
        onRequestOrders();
    }, 10000);

    if (orders) {
        title = `Orders (${orders.length})`;
    }
    ``;
    return (
        <section css={styles.container(type)}>
            <div css={styles.header}>
                <h3 css={styles.h3}>{title}</h3>
                {!notCanceled && (
                    <Button
                        label={cancelledFilter ? 'Show Cancelled' : 'Hide Cancelled'}
                        onClick={() => setCancelledFilter((x) => !x)}
                    />
                )}
            </div>
            {orders && !orders.length && <div css={styles.noOrders}>No current orders</div>}
            {orders && orders.length !== 0 && (
                <Fragment>
                    <table css={styles.table}>
                        {type !== 'compact' && (
                            <thead>
                                <tr>
                                    <td>name</td>
                                    <td>order</td>
                                    <td>qty</td>
                                    <td>created</td>
                                    <td>filled at</td>
                                    <td>status</td>
                                    <td>filled</td>
                                    <td>cancel?</td>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {orders
                                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                .filter((o) => (notCanceled || cancelledFilter ? o.status !== 'canceled' : o))
                                .map((o) => (
                                    <tr key={o.created_at} css={styles.disabled(o.status === 'canceled')}>
                                        <td>{o.symbol}</td>
                                        <td>{`${o.order_type} ${o.side}`}</td>
                                        <td>{o.qty}</td>
                                        <td>{format(new Date(o.created_at), 'MM/dd HH:mm:ss')}</td>
                                        <td>{o.filled_at && format(new Date(o.filled_at), 'MM/dd HH:mm:ss')}</td>
                                        <td>{o.status}</td>
                                        <td>{fillStatus(o)}</td>
                                        <td className="hoverable" onClick={() => onCancelOrder(o.id)}>
                                            {o.status !== 'canceled' && o.status !== 'filled' && (
                                                <Icon name="trash-bin-outline" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Fragment>
            )}
        </section>
    );
};

export default OrdersBox;
