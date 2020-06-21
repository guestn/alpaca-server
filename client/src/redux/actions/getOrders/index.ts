import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification } from '../createNotification/index.ts';
import { headers } from '../../../config';

export const GET_ORDERS_ERRORED = 'GET_ORDERS_ERRORED';
export const GET_ORDERS_SUCCEEDED = 'GET_ORDERS_SUCCEEDED';

interface GetOrdersErroredAction {
  type: typeof GET_ORDERS_ERRORED,
  error: Error,
}

interface GetOrdersSuccededAction {
  type: typeof GET_ORDERS_SUCCEEDED,
  data: [],
}

export const getOrdersErrored = (error: Error):GetOrdersErroredAction => ({
  type: GET_ORDERS_ERRORED,
  error,
});

export const getOrdersSucceeded = (data:[]):GetOrdersSuccededAction => ({
  type: GET_ORDERS_SUCCEEDED,
  data,
});

export const getOrders = () => (dispatch: Dispatch<any>) => {
  axios.get('https://paper-api.alpaca.markets/v2/orders?status=all', { headers })
    .then((response) => {
      if (response.status === 200) {
        dispatch(getOrdersSucceeded(response.data));
        //return dispatch(createNotification({ noteType: 'OK', message: 'Orders fetched successfully' }));
      }
      return null;
    })
    .catch((e) => {
      console.log({ e });
      
      dispatch(getOrdersErrored(e));
      const message = (e.response && e.response.data && e.response.data.error) || e.message;
      return dispatch(createNotification({ noteType: 'ERROR', message }));
    });
};
