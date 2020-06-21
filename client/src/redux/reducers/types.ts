export interface RootState {
  assets: [],
  accountData: {},
  notifications: [],
  historicalData: {},
  connectionStatus: {
    connection: boolean,
    stream: boolean,
  },
  newOrders: [],
  user: {
    displayName?: string,
  },
  liveData: {},
  liveQuotes: {},
  tradeUpdates: [],
  orders: [],
}