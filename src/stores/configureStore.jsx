import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from 'reducers';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => {
        return !(action.type && action.type.indexOf('redux-form') >= 0);
    }
});

export default function configureStore(state, browserHistory) {
    const reduxRouterMiddleWare = routerMiddleware(browserHistory);
    return createStore(
        reducers,
        state || {},
        compose(
            applyMiddleware(reduxRouterMiddleWare, loggerMiddleware, thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
