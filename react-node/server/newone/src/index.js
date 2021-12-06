import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import createRootReducer from './reducers';

import { doInit } from './actions/auth';
import { createHashHistory } from 'history';

import WebSocketProvider from './WebSocket';

const history = createHashHistory();

export function getHistory() {
  return history;
}

export const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk
    ),
  )
);

store.dispatch(doInit());

ReactDOM.render(
    <Provider store={store}>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
