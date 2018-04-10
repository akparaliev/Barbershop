import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux';
import { auth } from './reducers/AuthReducer';
import { service } from './reducers/ServiceReducer';
import { visit } from './reducers/VisitReducer';

const barberApp = combineReducers({
    auth,
    service,
    visit,
    notifications
});

export default barberApp;