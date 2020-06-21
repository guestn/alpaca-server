import { connect } from 'react-redux';
import actions from '../redux/actions/index.ts';

//import Alpaca from '@alpacahq/alpaca-trade-api';


// class WebsocketSubscriber {
//   constructor({ keyId, secretKey, paper = true }) {
//     this.alpaca = new Alpaca({
//       keyId: keyId,
//       secretKey: secretKey,
//       paper: paper,
//       usePolygon: USE_POLYGON
//     })


//     this.alpaca.lastQuote('AAPL').then((resp) => {
//       console.log(resp)
//     });

//     this.alpaca.lastTrade('AAPL').then((resp) => {
//       console.log(resp)
//     });

//     this.alpaca.getAggregates('AAPL', 'day', '2020-04-20', '2020-04-27').then((resp) => {
//       console.log(resp)
//     });
//     this.alpaca.getAggregates('AAPL', 'minute', '2020-04-20', '2020-04-20').then((resp) => {
//       console.log(resp)
//     });
//     this.alpaca.getBars('1Min', ['AAPL', 'TSLA'], {start:'2020-04-20', end:'2020-04-29'}).then((resp) => {
//       console.log(resp)
//     });
//     this.alpaca.getBars('1Min', 'AAPL', {start:'2020-04-20', end:'2020-04-29'}).then((resp) => {
//       console.log(resp)
//     });

//     const data_client = this.alpaca.data_ws
//     data_client.onConnect(function () {
//       console.log("Connected")
//       const keys = USE_POLYGON ? ['T.FB', 'Q.AAPL', 'A.FB', 'AM.AAPL'] :
//         ['alpacadatav1/T.FB', 'alpacadatav1/Q.AAPL', 'alpacadatav1/A.FB', 'alpacadatav1/AM.AAPL']
//       data_client.subscribe(keys);

//     })
//     data_client.onDisconnect(() => {
//       console.log("Disconnected")
//     })
//     data_client.onStateChange(newState => {
//       console.log(`State changed to ${newState}`)
//     })
//     data_client.onStockTrades(function (subject, data) {
//       console.log(`Stock trades: ${subject}, price: ${data.price}`)
//     })
//     data_client.onStockQuotes(function (subject, data) {
//       console.log(`Stock quotes: ${subject}, bid: ${data.bidprice}, ask: ${data.askprice}`)
//     })
//     data_client.onStockAggSec(function (subject, data) {
//       console.log(`Stock agg sec: ${subject}, ${data}`)
//     })
//     data_client.onStockAggMin(function (subject, data) {
//       console.log(`Stock agg min: ${subject}, ${data}`)
//     })
//     data_client.connect()

//     const updates_client = this.alpaca.trade_ws
//     updates_client.onConnect(function () {
//       console.log("Connected")
//       const trade_keys = ['trade_updates', 'account_updates']
//       updates_client.subscribe(trade_keys);
//     })
//     updates_client.onDisconnect(() => {
//       console.log("Disconnected")
//     })
//     updates_client.onStateChange(newState => {
//       console.log(`State changed to ${newState}`)
//     })
//     updates_client.onOrderUpdate(data => {
//       console.log(`Order updates: ${JSON.stringify(data)}`)
//     })
//     updates_client.onAccountUpdate(data => {
//       console.log(`Account updates: ${JSON.stringify(data)}`)
//     })
//     updates_client.connect()
//   }
// }

// // Run the LongShort class
// let ls = new WebsocketSubscriber({
//   keyId: API_KEY,
//   secretKey: API_SECRET,
//   paper: true,
// })
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
    streams: ['T.AAPL', 'Q.AAPL', 'Q.MSFT'],// 'AM.AAPL'],
  },
};

const WebsocketSubscriber = ({ dispatch }) => {
  console.log('WebsocketSubscriber');

  const ws = new WebSocket('wss://data.alpaca.markets/stream');
  ws.binaryType = 'arraybuffer';

  ws.addEventListener('open', (event) => {
    console.info('OPENED WS CONNECTION', event);
    ws.send(JSON.stringify(auth));
    dispatch(actions.updateConnectionStatus({ connection: true }));
  });

  ws.addEventListener('close', () => {
    console.info('CLOSED WS CONNECTION');
    dispatch(actions.updateConnectionStatus({ stream: null, connection: false }));
  });

  ws.addEventListener('message', (event) => {

    //console.log('Message from server ', event.data);
    // let str = new TextDecoder(ENCODING).decode(event.data);
    // const str = parseInt(event.data).toString(2)
    //const str = ab2str(new Uint8Array(event.data)); - for trade data need to unbinary it
    const msg = JSON.parse(event.data);
    console.log('msg', msg);

    switch (msg.stream) {
    case 'authorization':
      if (msg.data.status === 'authorized') {
        console.info('AUTHORIZED: ATTEMPT OPEN LISTENING STREAM');
        ws.send(JSON.stringify(listenData));
        //return ws.send(JSON.stringify(listenTradeUpdates));
      }
      return false;
    case 'listening':
      console.info('OPENED LISTENING STREAM', msg);
      return dispatch(actions.updateConnectionStatus({ stream: msg.data.streams }));
    case 'trade_updates':
      console.log('trade_updates');
      
      return dispatch(actions.saveTradeUpdate(msg.data));
    default: {
      const str = msg.stream.split('.');
      const ticker = str[1];
      const type = str[0];
      console.log({ ticker, type });
      if (type === 'T') {
        return dispatch(actions.saveLiveData({ ticker, data: msg.data }));
      }
      if (type === 'Q') {
        return dispatch(actions.saveLiveQuote({ ticker, data: msg.data }));
      }
    }
    }
  });
  return null;
};

export default connect(null, null)(WebsocketSubscriber);


/* 
msg: {
  data: {
    P: 313.06
    S: 1
    T: "AAPL"
    X: 15
    c: [1]
    ev: "Q"
    p: 312.99
    s: 1
    t: 1589918457110369500
x: 2
  },
  stream: "Q.AAPL"
}

datapoint:
c: 314.945
h: 315.1
l: 314.9
o: 314.96
t: Mon May 18 2020 11:55:00 GMT-0700 (Pacific Daylight Time) {}
v: 2734
*/
