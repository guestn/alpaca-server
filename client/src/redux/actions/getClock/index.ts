import axios, { AxiosResponse } from 'axios';
import { createNotification}  from '../createNotification/index.ts';
import { headers } from '../../../config'
import { Dispatch } from 'redux';

export const GET_CLOCK_ERRORED = 'GET_CLOCK_ERRORED';
export const GET_CLOCK_SUCCEEDED = 'GET_CLOCK_SUCCEEDED';

interface GetClockErroredAction {
  type: typeof GET_CLOCK_ERRORED,
  error: Error
}

interface GetClockSucceededAction {
  type: typeof GET_CLOCK_SUCCEEDED,
  data: {}
}

export const getClockErrored = (error: Error):GetClockErroredAction => ({
  type: GET_CLOCK_ERRORED,
  error,
});

export const getClockSucceeded = (data: object):GetClockSucceededAction => ({
  type: GET_CLOCK_SUCCEEDED,
  data,
});

export const getClock = () => (dispatch: Dispatch<any>) => {
  axios.get('https://paper-api.alpaca.markets/v2/clock', { headers })
    .then((response: AxiosResponse) => {
      dispatch(getClockSucceeded(response.data));
    })
    .catch((e: Error) => {
      dispatch(getClockErrored(e));
      return dispatch(createNotification({ noteType: 'ERROR', message: 'Could not get clock' }));
    });
};
