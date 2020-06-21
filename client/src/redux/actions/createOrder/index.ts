import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification } from '../createNotification/index.ts';
import { headers } from '../../../config.ts';

export const CREATE_ORDER_ERRORED = 'CREATE_ORDER_ERRORED';
export const CREATE_ORDER_SUCCEEDED = 'CREATE_ORDER_SUCCEEDED';

interface CreateOrderErroredAction {
  type: typeof CREATE_ORDER_ERRORED,
  error: Error,
}

interface CreateOrderSucceededAction {
  type: typeof CREATE_ORDER_SUCCEEDED,
  data: object,
}

enum Side {
  'buy', 'sell'
}

interface Params {
  symbol: string
  qty: number,
  side: Side,
  type: string,
  time_in_force: string,
}

export const createOrderErrored = (error: Error):CreateOrderErroredAction => ({
  type: CREATE_ORDER_ERRORED,
  error,
});

export const createOrderSucceeded = (data: object):CreateOrderSucceededAction => ({
  type: 'CREATE_ORDER_SUCCEEDED',
  data,
});

export const createOrder = ({ symbol, qty, side, type, time_in_force }: Params) => (dispatch: Dispatch<any>) => {
  const data = {
    symbol, qty, side, type, time_in_force,
  };
  axios.post('https://paper-api.alpaca.markets/v2/orders', data, { headers })
    .then((response) => {
      if (response.status === 200) {
        dispatch(createOrderSucceeded(response.data));
        return dispatch(createNotification({ noteType: 'OK', message: 'Order created successfully' }));
      }
      return null;
    })
    .catch((e) => {
      dispatch(createOrderErrored(e));
      return dispatch(createNotification({ noteType: 'ERROR', message: e.response.data.error }));
    });
};
