import React from 'react';
import './index.css';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import FooterPlayer from './containers/footer_player'

import Main from './components/Main'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, applyMiddleware(thunk))



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
