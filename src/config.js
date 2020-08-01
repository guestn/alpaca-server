"use strict";
exports.__esModule = true;
exports.apiRoot = exports.headers = void 0;
exports.headers = {
    'content-type': 'application/json',
    'APCA-API-KEY-ID': process.env.REACT_APP_ALPACA_CLIENT_ID,
    'APCA-API-SECRET-KEY': process.env.REACT_APP_ALPACA_API_SECRET
};
exports.apiRoot = 'https://paper-api.alpaca.markets';
