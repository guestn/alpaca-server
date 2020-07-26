import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification } from '../createNotification';
import { NoteType } from '../createNotification';

export const POST_ALERT_ERRORED = 'POST_ALERT_ERRORED';
export const POST_ALERT_SUCCEEDED = 'POST_ALERT_SUCCEEDED';

interface SaveAlertErroredAction {
  type: typeof POST_ALERT_ERRORED;
  error: Error;
}

interface SaveAlertSucceededAction {
  type: typeof POST_ALERT_SUCCEEDED;
  data: {};
}

export const postAlertErrored = (error: Error): SaveAlertErroredAction => ({
  type: POST_ALERT_ERRORED,
  error,
});

export const postAlertSucceeded = (data: []): SaveAlertSucceededAction => ({
  type: POST_ALERT_SUCCEEDED,
  data,
});

export const postAlert = (data) => (dispatch: Dispatch<any>) => {
  axios
    .post('api/alerts/alerts', data)
    .then((response) => {
      if (response.status === 200) {
        console.log({ response });
        dispatch(createNotification({ noteType: NoteType.OK, message: 'Alert updated successfully' }));
        return dispatch(postAlertSucceeded(response.data));
      }
      return null;
    })
    .catch((e) => {
      dispatch(postAlertErrored(e));
    });
};
