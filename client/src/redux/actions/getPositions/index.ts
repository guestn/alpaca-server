import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification } from '../createNotification';

export const GET_POSITIONS_SUCCEEDED = 'GET_POSITIONS_SUCCEEDED';
export const GET_POSITIONS_ERRORED = 'GET_POSITIONS_ERRORED';

interface GetPositionsErroredAction {
  type: typeof GET_POSITIONS_ERRORED,
  error: Error,
}

interface GetPositionsSucceededAction {
  type: typeof GET_POSITIONS_SUCCEEDED,
  positions: [],
}

export const getPositionsErrored = (error: Error): GetPositionsErroredAction => ({
  type: 'GET_POSITIONS_ERRORED',
  error,
});

export const getPositionsSucceeded = (positions: []): GetPositionsSucceededAction => ({
  type: 'GET_POSITIONS_SUCCEEDED',
  positions,
});

export const getPositions = () => (dispatch: Dispatch<any>) => {
  axios.get('api/positions')
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
