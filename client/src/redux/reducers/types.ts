export interface AccountData {
    buying_power: string;
    cash: string;
    portfolio_value: string;
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
    p: number;
    t: number;
}

export interface Notification {
    message: string;
    noteType: any;
    createdAt: string;
}

export interface Order {
    id: string;
    created_at: string;
    symbol: string;
    status: string;
    qty: string;
    filled_at: string;
    order_type: string;
    side: string;
    filled_qty: string;
    filled_avg_price: string;
}
export interface User {
    displayName?: string;
}

export interface RootState {
    accountData?: AccountData;
    alerts?: Alert[];
    assets?: Asset[];
    clock?: Clock;
    connectionStatus?: ConnectionStatus;
    historicalData?: HistoricalData;
    liveData?: LiveData;
    liveQuotes?: {};
    newOrders?: [];
    notifications?: Notification[];
    orders?: Order[];
    positions: [];
    status: {};
    ticker?: string;
    tradeUpdates?: [];
    user?: User;
}
