import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification, NoteType } from '../createNotification';

export const CREATE_ORDER_ERRORED = 'CREATE_ORDER_ERRORED';
export const CREATE_ORDER_SUCCEEDED = 'CREATE_ORDER_SUCCEEDED';

interface CreateOrderErroredAction {
    type: typeof CREATE_ORDER_ERRORED;
    error: Error;
}

interface CreateOrderSucceededAction {
    type: typeof CREATE_ORDER_SUCCEEDED;
    newOrders: object;
}

enum Side {
    'buy',
    'sell',
}

export interface CreateOrderParams {
    symbol: string;
    qty: number;
    side: Side;
    type: string;
    time_in_force: string;
}

export const createOrderErrored = (error: Error): CreateOrderErroredAction => ({
    type: CREATE_ORDER_ERRORED,
    error,
});

export const createOrderSucceeded = (newOrders: object): CreateOrderSucceededAction => ({
    type: 'CREATE_ORDER_SUCCEEDED',
    newOrders,
});

export const createOrder =
    ({ symbol, qty, side, type, time_in_force }: CreateOrderParams) =>
    (dispatch: Dispatch<any>) => {
        const data = {
            symbol,
            qty,
            side,
            type,
            time_in_force,
        };
        axios
            .post('api/orders', data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(createOrderSucceeded(response.data));
                    return dispatch(
                        createNotification({ noteType: NoteType.OK, message: 'Order created successfully' }),
                    );
                }
                return null;
            })
            .catch((e) => {
                dispatch(createOrderErrored(e));
                return dispatch(createNotification({ noteType: NoteType.ERROR, message: e.response.data.error }));
            });
    };
