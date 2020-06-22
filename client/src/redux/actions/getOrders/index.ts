import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification, NoteType } from '../createNotification';

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
  const params = { status: 'all' };
  axios.get('api/orders', { params })
    .then((response) => {
      if (response.status === 200) {
        dispatch(getOrdersSucceeded(response.data));
        //return dispatch(createNotification({ noteType: NoteType.OK, message: 'Orders fetched successfully' }));
      }
      return null;
    })
    .catch((e) => {
      console.log({ e });
      
      dispatch(getOrdersErrored(e));
      const message = (e.response && e.response.data && e.response.data.error) || e.message;
      return dispatch(createNotification({ noteType: NoteType.ERROR, message }));
    });
};
