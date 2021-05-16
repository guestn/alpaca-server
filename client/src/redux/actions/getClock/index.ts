import axios, { AxiosResponse } from 'axios';
import { createNotification, NoteType }  from '../createNotification/index';
import { Dispatch } from 'redux';

export const GET_CLOCK_ERRORED = 'GET_CLOCK_ERRORED';
export const GET_CLOCK_SUCCEEDED = 'GET_CLOCK_SUCCEEDED';

interface GetClockErroredAction {
  type: typeof GET_CLOCK_ERRORED,
  error: Error
}

interface GetClockSucceededAction {
  type: typeof GET_CLOCK_SUCCEEDED,
  clock: {}
}

export const getClockErrored = (error: Error):GetClockErroredAction => ({
  type: GET_CLOCK_ERRORED,
  error,
});

export const getClockSucceeded = (clock: object):GetClockSucceededAction => ({
  type: GET_CLOCK_SUCCEEDED,
  clock,
});

export const getClock = () => (dispatch: Dispatch<any>) => {
  axios.get('api/clock')
    .then((response: AxiosResponse) => {
      dispatch(getClockSucceeded(response.data));
    })
    .catch((e: Error) => {
      dispatch(getClockErrored(e));
      return dispatch(createNotification({ noteType: NoteType.ERROR, message: 'Could not get clock' }));
    });
};
