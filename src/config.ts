interface Headers {
  'content-type': string;
  'APCA-API-KEY-ID': string | undefined;
  'APCA-API-SECRET-KEY': string | undefined;
}

export const headers: Headers = {
  'content-type': 'application/json',
  'APCA-API-KEY-ID': process.env.REACT_APP_ALPACA_CLIENT_ID || process.env['APCA-API-KEY-ID'],
  'APCA-API-SECRET-KEY': process.env.REACT_APP_ALPACA_API_SECRET || process.env['APCA-API-SECRET-KEY'],
};

export const apiRoot = 'https://paper-api.alpaca.markets';
