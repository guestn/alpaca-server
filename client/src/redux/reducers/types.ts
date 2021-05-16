
export interface AccountData {
  buying_power: string,
  cash: string,
  portfolio_value: string,
}
export interface Asset {
    symbol: string;
}

export interface Alert {}

export interface Clock {}

export interface ConnectionStatus {
    connection: boolean;
    stream: boolean;
}

export interface HistoricalData {}
export interface LiveData {
    [key: string]: {
        p: string;
    };
}

export interface Notification {
    message: string;
    noteType: any;
    createdAt: string;
}
export interface User {
    displayName?: string;
}

export interface RootState {
    alerts?: Alert[];
    assets?: Asset[];
    accountData?: AccountData;
    clock?: Clock;
    notifications?: Notification[];
    historicalData?: HistoricalData;
    connectionStatus?: ConnectionStatus;
    newOrders?: [];
    user?: User;
    status: {};
    liveData?: LiveData;
    liveQuotes?: {};
    tradeUpdates?: [];
    orders?: { id: string }[];
    ticker?: string;
    positions: [];
}
