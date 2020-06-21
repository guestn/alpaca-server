import { Dispatch } from 'redux';

export const SAVE_TRADE_UPDATE_SUCCEEDED = 'SAVE_TRADE_UPDATE_SUCCEEDED';

interface SaveTradeUpdateSucceededAction {
  type: typeof SAVE_TRADE_UPDATE_SUCCEEDED,
  data: {}
}
export const saveTradeUpdateSucceeded = (data: {}): SaveTradeUpdateSucceededAction => ({
  type: SAVE_TRADE_UPDATE_SUCCEEDED,
  data,
});


export const saveTradeUpdate = (data: {}) => (dispatch: Dispatch<any>) => {
  return dispatch(saveTradeUpdateSucceeded(data));
};
