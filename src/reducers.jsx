import {combineReducers}  from 'redux';
import {routerReducer}  from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {reducer as notifications} from 'react-notification-system-redux';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  notifications
});
