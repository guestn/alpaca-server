import { RootState } from './types';
import { Action } from 'redux';
import * as at from '../actions/actionTypes';


export const initialState: RootState = {
  assets: [],
  accountData: {},
  notifications: [],
  historicalData: {},
  connectionStatus: {
    connection: false,
    stream: false,
  },
  newOrders: [],
  user: {},
  liveData: {},
  liveQuotes: {},
  tradeUpdates: [],
  orders: [],
};

// TODO: Split reducer into many
const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
  case at.REQUEST_LOGIN_SUCCEEDED:
    return {
      ...state,
      user: action.user,
    };
  case at.REQUEST_LOGOUT_SUCCEEDED:
    return {
      ...state,
      user: {},
    };
  case at.REQUEST_LOGIN_ERRORED:
  case at.REQUEST_LOGOUT_ERRORED:
  case at.GET_HISTORICAL_DATA_ERRORED:
  case at.CREATE_ORDER_ERRORED:
  case at.GET_ORDERS_ERRORED:
  case at.GET_ASSETS_ERRORED:
  case at.GET_ACCOUNT_DATA_ERRORED:
    return { ...state, lastError: action.error };
  case at.GET_HISTORICAL_DATA_SUCCEEDED:
    return { ...state, historicalData: action.data };
  case at.SAVE_LIVE_DATA_SUCCEEDED:
    return {
      ...state,
      liveData: {
        ...state.liveData,
        [action.ticker]: action.data,
      },
    };
  case at.SAVE_LIVE_QUOTE_SUCCEEDED:
    return {
      ...state,
      liveQuotes: {
        ...state.liveQuotes,
        [action.ticker]: action.data,
      },
    };
  case at.SAVE_TRADE_UPDATE_SUCCEEDED:
    return {
      ...state,
      tradeUpdates: [
        ...state.tradeUpdates,
        action.data,
      ],
    };
  case at.GET_ACCOUNT_DATA_SUCCEEDED:
    return { ...state, accountData: action.data };
  case at.GET_CLOCK_SUCCEEDED:
    return {
      ...state,
      clock: action.data,
    };
  case at.UPDATE_CONNECTION_STATUS_SUCCEEDED:
    console.log({ 1: state.connectionStatus, 2: action.status  });
    
    return {
      ...state,
      connectionStatus: {
        ...state.connectionStatus,
        ...action.status,
      },
    };
  case at.CREATE_ORDER_SUCCEEDED:
    return {
      ...state,
      newOrders: [
        ...state.newOrders,
        action.data,
      ],
    };
  case at.GET_ORDERS_SUCCEEDED:
    return {
      ...state,
      orders: action.data,
    };
  case at.CANCEL_ORDER_SUCCEEDED:
    return {
      ...state,
      orders: state.orders.filter((o) => o.id !== action.id),
    };
  case at.GET_POSITIONS_SUCCEEDED:
    return {
      ...state,
      positions: action.data,
    };
  case at.GET_ASSETS_SUCCEEDED:
    return {
      ...state,
      assets: action.data,
    };
  case at.CREATE_NOTIFICATION:
    return {
      ...state,
      notifications: [
        {
          message: action.message,
          noteType: action.noteType,
          createdAt: action.createdAt,
        }, ...state.notifications,
      ] };
  default:
    return state;
  }
};

export default reducer;
