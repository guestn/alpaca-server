import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification } from '../createNotification/index.ts';
// @ts-ignore
import { headers } from '../../../config.ts';

export const CANCEL_ORDER_ERRORED = 'CANCEL_ORDER_ERRORED';
export const CANCEL_ORDER_SUCCEEDED = 'CANCEL_ORDER_SUCCEEDED';

interface CancelOrderErroredAction {
  type: typeof CANCEL_ORDER_ERRORED,
  error: Error,
}

interface CancelOrderSucceededAction {
  type: typeof CANCEL_ORDER_SUCCEEDED,
  id: string,
}

export const cancelOrderErrored = (error: Error):CancelOrderErroredAction => ({
  type: CANCEL_ORDER_ERRORED,
  error,
});

export const cancelOrderSucceeded = (id: string):CancelOrderSucceededAction => ({
  type: CANCEL_ORDER_SUCCEEDED,
  id,
});

export const cancelOrder = (id: string) => (dispatch: Dispatch<any>) => {
  axios.delete(`https://paper-api.alpaca.markets/v2/orders/${id}`, { headers })
    .then((response) => {
      if (response.status === 200) {
        dispatch(cancelOrderSucceeded(id));
        return dispatch(createNotification({ noteType: 'OK', message: 'Orders cancelled successfully' }));
      }
      return null;
    })
    .catch((e) => {
      dispatch(cancelOrderErrored(e));
      const message = (e.response && e.response.data && e.response.data.error) || e.message;
      return dispatch(createNotification({ noteType: 'ERROR', message }));
    });
};
