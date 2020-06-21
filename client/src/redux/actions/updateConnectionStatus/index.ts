import { Dispatch } from 'redux';

export const UPDATE_CONNECTION_STATUS_SUCCEEDED = 'UPDATE_CONNECTION_STATUS_SUCCEEDED';

interface UpdateConnectionStatusSucceededAction {
  type: typeof UPDATE_CONNECTION_STATUS_SUCCEEDED,
  status: {},
}

export const updateConnectionStatusSucceeded = (status: {}):UpdateConnectionStatusSucceededAction => ({
  type: UPDATE_CONNECTION_STATUS_SUCCEEDED,
  status,
});


export const updateConnectionStatus = (status: {}) => (dispatch: Dispatch<any>) => (
  dispatch(updateConnectionStatusSucceeded(status))
);
