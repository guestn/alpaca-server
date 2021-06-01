import { cancelOrder } from './cancelOrder';
import { createNotification } from './createNotification';
import { createOrder } from './createOrder';
import { getAccountData } from './getAccountData';
import { getAssets } from './getAssets';
import { getAlerts } from './getAlerts';
import { getClock } from './getClock';
import { getHistoricalData } from './getHistoricalData';
import { getOrders } from './getOrders';
import { getPositions } from './getPositions';
import { requestLogin } from './requestLogin';
import { requestLogout } from './requestLogout';
import { saveLiveData, saveLiveDataSucceeded } from './saveLiveData';
import { saveLiveQuote } from './saveLiveQuote';
import { saveTradeUpdate } from './saveTradeUpdate';
import { updateConnectionStatus } from './updateConnectionStatus';
import { postAlert } from './postAlert';
import { deleteAlert } from './deleteAlert';

const actions = {
  cancelOrder,
  createNotification,
  createOrder,
  getAccountData,
  getAlerts,
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
  postAlert,
  deleteAlert,
};

export default actions;
