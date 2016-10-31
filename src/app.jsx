import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from 'stores/configureStore';
import {loadState, saveState} from 'stores/localstorage';
import throttle from 'lodash/throttle';
import routes from 'routes';

require('assets/main.scss');

export const history = browserHistory;
export const store = configureStore({}, history);

store.subscribe(throttle(() => {
    saveState({});
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes()}
        </Router>
    </Provider>,
    document.getElementById('root')
);