import { cancelOrder } from './cancelOrder/index.ts';
import { createNotification } from './createNotification/index.ts';
import { createOrder } from './createOrder/index.ts';
import { getAccountData } from './getAccountData/index.ts';
import { getAssets } from './getAssets/index.ts';
import { getClock } from './getClock/index.ts';
import { getHistoricalData } from './getHistoricalData/index.ts';
import { getOrders } from './getOrders/index.ts';
import { getPositions } from './getPositions/index.ts';
import { requestLogin } from './requestLogin/index.ts';
import { requestLogout } from './requestLogout/index.ts';
import { saveLiveData, saveLiveDataSucceeded } from './saveLiveData/index.ts';
import { saveLiveQuote } from './saveLiveQuote/index.ts';
import { saveTradeUpdate } from './saveTradeUpdate/index.ts';
import { updateConnectionStatus } from './updateConnectionStatus/index.ts';

const actions = {
  cancelOrder,
  createNotification,
  createOrder,
  getAccountData,
  getAssets,
  getClock,
  getHistoricalData,
  getOrders,
  getPositions,
  requestLogin,
  requestLogout,
  saveLiveData,
  saveLiveDataSucceeded,
  saveLiveQuote,
  saveTradeUpdate,
  updateConnectionStatus,
};

export default actions;
