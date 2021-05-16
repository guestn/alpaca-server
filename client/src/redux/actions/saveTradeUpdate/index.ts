import { Dispatch } from 'redux';

export const SAVE_TRADE_UPDATE_SUCCEEDED = 'SAVE_TRADE_UPDATE_SUCCEEDED';

interface SaveTradeUpdateSucceededAction {
  type: typeof SAVE_TRADE_UPDATE_SUCCEEDED,
  tradeUpdates: {}
}
export const saveTradeUpdateSucceeded = (tradeUpdates: {}): SaveTradeUpdateSucceededAction => ({
  type: SAVE_TRADE_UPDATE_SUCCEEDED,
  tradeUpdates,
});


export const saveTradeUpdate = (tradeUpdates: {}) => (dispatch: Dispatch<any>) => {
  return dispatch(saveTradeUpdateSucceeded(tradeUpdates));
};
