import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './containers/App';
import WebsocketSubscriber from './websocket';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <WebsocketSubscriber />
        <App />
    </Provider>,
    rootElement,
);
