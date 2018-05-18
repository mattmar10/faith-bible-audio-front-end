import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

import ReduxPromise from 'redux-promise'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(ReduxPromise))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
