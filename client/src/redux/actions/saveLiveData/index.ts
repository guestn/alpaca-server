import { Dispatch } from 'redux';

export const SAVE_LIVE_DATA_SUCCEEDED = 'SAVE_LIVE_DATA_SUCCEEDED'

interface SaveLiveDataSucceededAction {
  type: typeof SAVE_LIVE_DATA_SUCCEEDED,
  ticker: string,
  liveData: [],
}

interface Params {
  ticker: string,
  liveData: [],
}

export const saveLiveDataSucceeded = ({ ticker, liveData }: Params):SaveLiveDataSucceededAction => ({
  type: SAVE_LIVE_DATA_SUCCEEDED,
  liveData,
  ticker,
});

export const saveLiveData = ({ ticker, liveData }: Params) => (dispatch: Dispatch<any>) => {
  return dispatch(saveLiveDataSucceeded({ ticker, liveData }));
};
