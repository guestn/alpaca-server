import { Dispatch } from 'redux';

export const SAVE_LIVE_QUOTE_SUCCEEDED = 'SAVE_LIVE_QUOTE_SUCCEEDED';

interface SaveLiveQuoteSucceededAction {
  type: typeof SAVE_LIVE_QUOTE_SUCCEEDED,
  data: {},
  ticker: string,
}

export const saveLiveQuoteSucceeded = ({ ticker, data }):SaveLiveQuoteSucceededAction => ({
  type: SAVE_LIVE_QUOTE_SUCCEEDED,
  data,
  ticker,
});


export const saveLiveQuote = ({ ticker, data }) => (dispatch: Dispatch<any>) => {
  return dispatch(saveLiveQuoteSucceeded({ ticker, data }));
};
