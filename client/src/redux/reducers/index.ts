import { RootState } from './types';
import { Action, bindActionCreators } from 'redux';
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

type AllActions = Action & RootState;

// TODO: Split reducer into many
const reducer = (state = initialState, action: AllActions): RootState => {
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
        case at.GET_ALERTS_ERRORED:
            return { ...state, lastError: action.error };
        case at.GET_HISTORICAL_DATA_SUCCEEDED:
            console.log({ a: action.historicalData });
            //const key = Object.keys(action.data)
            return { ...state, historicalData: { ...state.historicalData, ...action.historicalData } };
        case at.SAVE_LIVE_DATA_SUCCEEDED:
            return {
                ...state,
                liveData: {
                    ...state.liveData,
                    [action.ticker]: action.liveData,
                },
            };
        case at.SAVE_LIVE_QUOTE_SUCCEEDED:
            return {
                ...state,
                liveQuotes: {
                    ...state.liveQuotes,
                    [action.ticker]: action.liveQuotes,
                },
            };
        case at.SAVE_TRADE_UPDATE_SUCCEEDED:
            return {
                ...state,
                tradeUpdates: [...state.tradeUpdates, action.tradeUpdates],
            };
        case at.GET_ACCOUNT_DATA_SUCCEEDED:
            return { ...state, accountData: action.accountData };
        case at.GET_CLOCK_SUCCEEDED:
            return {
                ...state,
                clock: action.clock,
            };
        case at.GET_ALERTS_SUCCEEDED:
            return {
                ...state,
                alerts: action.alerts,
            };
        case at.POST_ALERT_SUCCEEDED:
            const existingAlertIdx = state.alerts.findIndex((alert) => alert.id === action.alert.id);
            let updatedAlerts;
            if (existingAlertIdx > -1) {
                updatedAlerts = [...state.alerts];
                updatedAlerts[existingAlertIdx] = action.alert;
            } else {
                updatedAlerts = [...state.alerts, action.alert];
            }
            return {
                ...state,
                alerts: updatedAlerts,
            };
        case at.DELETE_ALERT_SUCCEEDED:
            const newAlerts = state.alerts.filter((alert) => alert.id !== action.id);
            console.log({ newAlerts });
            return {
                ...state,
                alerts: newAlerts,
            };
        case at.UPDATE_CONNECTION_STATUS_SUCCEEDED:
            console.log({ 1: state.connectionStatus, 2: action.status });

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
                newOrders: [...state.newOrders, action.newOrders],
            };
        case at.GET_ORDERS_SUCCEEDED:
            return {
                ...state,
                orders: action.orders,
            };
        case at.CANCEL_ORDER_SUCCEEDED:
            return {
                ...state,
                orders: state.orders.filter((o) => o.id !== action.id),
            };
        case at.GET_POSITIONS_SUCCEEDED:
            return {
                ...state,
                positions: action.positions,
            };
        case at.GET_ASSETS_SUCCEEDED:
            return {
                ...state,
                assets: action.assets,
            };
        case at.CREATE_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    {
                        message: action.notification.message,
                        noteType: action.notification.noteType,
                        createdAt: action.notification.createdAt,
                    },
                    ...state.notifications,
                ],
            };
        default:
            return state;
    }
};

export default reducer;
