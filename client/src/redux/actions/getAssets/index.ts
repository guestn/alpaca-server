import axios from 'axios';
import { Dispatch } from 'redux';

export const GET_ASSETS_ERRORED = 'GET_ASSETS_ERRORED';
export const GET_ASSETS_SUCCEEDED = 'GET_ASSETS_SUCCEEDED';

interface GetAssetsErroredAction {
  type: typeof GET_ASSETS_ERRORED,
  error: Error,
}

interface GetAssetsSucceededAction {
  type: typeof GET_ASSETS_SUCCEEDED,
  data: {},
}

export const getAssetsErrored = (error: Error): GetAssetsErroredAction => ({
  type: 'GET_ASSETS_ERRORED',
  error,
});

export const getAssetsSucceeded = (data: []):GetAssetsSucceededAction => ({
  type: 'GET_ASSETS_SUCCEEDED',
  data,
});

export const getAssets = () => (dispatch: Dispatch<any>) => {
  axios.get('api/assets')
    .then((response) => {
      if (response.status === 200) {
        return dispatch(getAssetsSucceeded(response.data));
      }
      return null;
    })
    .catch((e) => {
      dispatch(getAssetsErrored(e));
    });
};
