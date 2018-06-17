import React from 'react';
import './index.css';
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {loadState, saveState} from './localstorage'
import FooterPlayer from './containers/footer_player'
import Main from './components/Main'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import _ from 'lodash'

import registerServiceWorker from './registerServiceWorker';

const preloadedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)))



store.subscribe(
    _.debounce(() => {
        saveState({
            favoriteSermons: store.getState().favoriteSermons
        })},
    500)
);


render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
            <FooterPlayer />
        </div>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
