import WebSocket from 'ws';
import { checkAlerts } from '../notifications';

export const ws = new WebSocket('wss://data.alpaca.markets/stream');
export const startWSStream = () => {
    const ws = new WebSocket('wss://data.alpaca.markets/stream');
    if (!ws) return;

    ws.on('error', (e) => {
        console.error(e);
    });

    ws.binaryType = 'arraybuffer';

    ws.on('open', () => {
        //ws.send('something');
        console.info('OPENED WS CONNECTION');
        ws.send(JSON.stringify(auth));
    });

    ws.on('close', () => {
        console.info('CLOSED WS CONNECTION');
    });

    ws.on('message', (data) => {
        console.log(data);
        const msg = JSON.parse(data.toString());
        console.log('msg', msg);

        doSample();

        switch (msg.stream) {
            case 'authorization':
                if (msg.data.status === 'authorized') {
                    console.info('AUTHORIZED: ATTEMPT OPEN LISTENING STREAM');
                    ws.send(JSON.stringify(listenData));
                }
                return false;
            case 'listening':
                console.info('OPENED LISTENING STREAM', msg);
                break;
            case 'trade_updates':
                console.log('trade_updates');
                break;
            default: {
                const str = msg.stream.split('.');
                const ticker = str[1];
                const type = str[0];
                console.log({ ticker, type });
                if (type === 'T') {
                    checkAlerts({ ticker, data: msg.data });
                }
                if (type === 'Q') {
                }
            }
        }
    });

    const listenTradeUpdates = {
        action: 'listen',
        data: {
            streams: ['account_updates', 'trade_updates'],
        },
    };

    const auth = {
        action: 'authenticate',
        data: {
            key_id: process.env.REACT_APP_ALPACA_CLIENT_ID,
            secret_key: process.env.REACT_APP_ALPACA_API_SECRET,
        },
    };

    const listenData = {
        action: 'listen',
        data: {
            streams: ['T.AAPL', 'Q.AAPL', 'Q.MSFT'], // 'AM.AAPL'],
        },
    };
    //   ws.binaryType = 'arraybuffer';
};

const sampleMsg = {
    data: {
        P: 1505,
        S: 1,
        T: 'AAPL',
        X: 15,
        c: [1],
        ev: 'Q',
        p: 1140.2,
        s: 1,
        t: 1589918457110369500,
        x: 2,
    },
    stream: 'Q.AAPL',
};

const doSample = () => {
    const str = sampleMsg.stream.split('.');
    const ticker = str[1];
    const type = str[0];
    console.log({ ticker, type });
    checkAlerts({ ticker, data: sampleMsg.data });
};
/*
datapoint:
c: 314.945
h: 315.1
l: 314.9
o: 314.96
t: Mon May 18 2020 11:55:00 GMT-0700 (Pacific Daylight Time) {}
v: 2734
*/
