import { Dispatch } from 'redux';

export const SAVE_LIVE_DATA_SUCCEEDED = 'SAVE_LIVE_DATA_SUCCEEDED'

interface SaveLiveDataSucceededAction {
  type: typeof SAVE_LIVE_DATA_SUCCEEDED,
  ticker: string,
  data: [],
}

interface Params {
  ticker: string,
  data: [],
}

export const saveLiveDataSucceeded = ({ ticker, data }: Params):SaveLiveDataSucceededAction => ({
  type: SAVE_LIVE_DATA_SUCCEEDED,
  data,
  ticker,
});

export const saveLiveData = ({ ticker, data }: Params) => (dispatch: Dispatch<any>) => {
  return dispatch(saveLiveDataSucceeded({ ticker, data }));
};
