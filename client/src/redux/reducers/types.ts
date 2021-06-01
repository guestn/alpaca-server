import { DefaultRootState } from 'react-redux'
import { NoteType } from '../actions/createNotification';

export interface AccountData {
    buying_power: string;
    cash: string;
    portfolio_value: string;
}
export interface Asset {
    symbol: string;
}

export interface Alert {
    createdAt: string;
    high: string;
    highSent: string;
    historicalData: HistoricalData;
    id: string;
    low: string;
    lowSent: string;
    mid: string;
    ticker: string;
}

export interface Clock {
    is_open: boolean;
    next_open: string;
    next_close: string;
}

export interface ConnectionStatus {
    connection: boolean;
    stream: boolean;
}

export interface HistoricalData {
    [key: string]: HistoricalDatum;
}

export interface HistoricalDatum {
    c: string;
}
export interface LiveData {
    [key: string]: LiveDatum;
}

export interface LiveDatum {
    p: number;
    t: number;
}

export interface Notification {
    message: string;
    noteType: NoteType;
    createdAt?: string;
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

export interface Position {
    asset_class: string;
    asset_id: string;
    avg_entry_price: string;
    change_today: string;
    cost_basis: string;
    current_price: string;
    exchange: string;
    lastday_price: string;
    market_value: string;
    qty: string;
    side: string;
    symbol: string;
    unrealized_intraday_pl: string;
    unrealized_intraday_plpc: string;
    unrealized_pl: string;
    unrealized_plpc: string;
}
export interface User {
    name?: string;
    displayName?: string;
    role: number;
    email: string;
}

export interface RootState extends DefaultRootState {
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
    positions?: Position[];
    status?: {};
    ticker?: string;
    tradeUpdates?: [];
    user?: User;
    lastError?: any;
    errors: {}
}
