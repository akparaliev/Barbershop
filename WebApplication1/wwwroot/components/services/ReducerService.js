import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux';
import { auth } from './reducers/Auth';
import { service } from './reducers/Service';
import { visit } from './reducers/Visit';


const barberApp = combineReducers({
    auth,
    service,
    visit,
    notifications
});



export default barberApp;