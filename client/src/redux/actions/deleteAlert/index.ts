import axios from 'axios';
import { Dispatch } from 'redux';
import { Tracing } from 'trace_events';

export const DELETE_ALERT_ERRORED = 'DELETE_ALERT_ERRORED';
export const DELETE_ALERT_SUCCEEDED = 'DELETE_ALERT_SUCCEEDED';

interface DeleteAlertErroredAction {
  type: typeof DELETE_ALERT_ERRORED;
  error: Error;
}

interface DeleteAlertSucceededAction {
  type: typeof DELETE_ALERT_SUCCEEDED;
  id: string;
}

export const deleteAlertErrored = (error: Error): DeleteAlertErroredAction => ({
  type: DELETE_ALERT_ERRORED,
  error,
});

export const deleteAlertSucceeded = (id: string): DeleteAlertSucceededAction => ({
  type: DELETE_ALERT_SUCCEEDED,
  id,
});

export const deleteAlert = (id: string) => (dispatch: Dispatch<any>) => {
  console.log({ id });
  axios
    .delete(`api/alerts/alerts/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log({ response });
        return dispatch(deleteAlertSucceeded(id));
      }
      return null;
    })
    .catch((e) => {
      dispatch(deleteAlertErrored(e));
    });
};
