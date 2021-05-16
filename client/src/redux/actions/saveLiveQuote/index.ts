import { Dispatch } from 'redux';

export const SAVE_LIVE_QUOTE_SUCCEEDED = 'SAVE_LIVE_QUOTE_SUCCEEDED';

interface SaveLiveQuoteSucceededAction {
  type: typeof SAVE_LIVE_QUOTE_SUCCEEDED,
  liveQuotes: {},
  ticker: string,
}

export const saveLiveQuoteSucceeded = ({ ticker, liveQuotes }):SaveLiveQuoteSucceededAction => ({
  type: SAVE_LIVE_QUOTE_SUCCEEDED,
  liveQuotes,
  ticker,
});


export const saveLiveQuote = ({ ticker, liveQuotes }) => (dispatch: Dispatch<any>) => {
  return dispatch(saveLiveQuoteSucceeded({ ticker, liveQuotes }));
};
