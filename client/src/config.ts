interface Headers {
  'content-type': string,
  'APCA-API-KEY-ID': string | undefined,
  'APCA-API-SECRET-KEY': string | undefined,
}

export const headers:Headers = {
  'content-type': 'application/json',
  'APCA-API-KEY-ID': process.env.REACT_APP_ALPACA_CLIENT_ID,
  'APCA-API-SECRET-KEY': process.env.REACT_APP_ALPACA_API_SECRET,
};