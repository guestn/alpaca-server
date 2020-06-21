import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase/app';
import store from './redux/store/index.ts';
import 'firebase/auth';
import 'firebase/firestore';
import App from './containers/App';
import WebsocketSubscriber from './websocket';

const firebaseConfig = {
  apiKey: 'AIzaSyBQnFxQzXJLdCOuCzEs-zsWR_-hwE4mjnw',
  authDomain: 'alpaca-trade-interface.firebaseapp.com',
  databaseURL: 'https://alpaca-trade-interface.firebaseio.com',
  projectId: 'alpaca-trade-interface',
  storageBucket: 'alpaca-trade-interface.appspot.com',
  messagingSenderId: '214804315862',
  appId: '1:214804315862:web:213174522a13596f141377',
  measurementId: 'G-4DZBQ8RHEN',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <WebsocketSubscriber />
    <App firebase={firebase} />
  </Provider>
), rootElement);
