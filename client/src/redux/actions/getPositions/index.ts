import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification } from '../createNotification/index.ts';

export const GET_POSITIONS_SUCCEEDED = 'GET_POSITIONS_SUCCEEDED';
export const GET_POSITIONS_ERRORED = 'GET_POSITIONS_ERRORED';

interface GetPositionsErroredAction {
  type: typeof GET_POSITIONS_ERRORED,
  error: Error,
}

interface GetPositionsSucceededAction {
  type: typeof GET_POSITIONS_SUCCEEDED,
  data: [],
}

export const getPositionsErrored = (error: Error): GetPositionsErroredAction => ({
  type: 'GET_POSITIONS_ERRORED',
  error,
});

export const getPositionsSucceeded = (data: []): GetPositionsSucceededAction => ({
  type: 'GET_POSITIONS_SUCCEEDED',
  data,
});

export const getPositions = () => (dispatch: Dispatch<any>) => {
  const headers = {
    'Content-Type': 'application/json',
    'APCA-API-KEY-ID': process.env.REACT_APP_ALPACA_CLIENT_ID,
    'APCA-API-SECRET-KEY': process.env.REACT_APP_ALPACA_API_SECRET,
  };

  axios.get('https://paper-api.alpaca.markets/v2/positions', { headers })
    .then((response) => {
      if (response.status === 200) {
        dispatch(getPositionsSucceeded(response.data));
        return dispatch(createNotification({ noteType: 'OK', message: 'Positions fetched successfully' }));
      }
      return null;
    })
    .catch((e) => {
      dispatch(getPositionsErrored(e));
      const message = (e.response && e.response.data && e.response.data.error) || e.message;
      return dispatch(createNotification({ noteType: 'ERROR', message }));
    });
};
