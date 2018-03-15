import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux';

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE,
    SERVICE_DELETE_REQUEST, SERVICE_DELETE_SUCCESS, SERVICE_DELETE_FAILURE,
    SERVICE_VISIT_REQUEST, SERVICE_VISIT_SUCCESS, SERVICE_VISIT_FAILURE,
    VISIT_REQUEST, VISIT_SUCCESS, VISIT_FAILURE,
    VISIT_BAN_REQUEST, VISIT_BAN_SUCCESS, VISIT_BAN_FAILURE
} from './ActionService'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    user: localStorage.getItem('id_token') ?JSON.parse(localStorage.getItem('user')):null
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            })
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        default:
            return state
    }
}

function service(state = {
    isFetching: false,
    services: null,
    authenticated: false
}, action) {
    switch (action.type) {
        case SERVICE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case SERVICE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                services: action.response,
                authenticated: action.authenticated || false
            })
        case SERVICE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case SERVICE_DELETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case SERVICE_DELETE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authenticated: action.authenticated || false
            })
        case SERVICE_DELETE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case SERVICE_VISIT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case SERVICE_VISIT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authenticated: action.authenticated || false
            })
        case SERVICE_VISIT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}


function visit(state = {
    isFetching: false,
    visits: null,
    authenticated: false
}, action) {
    switch (action.type) {
        case VISIT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case VISIT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                visits: action.response,
                authenticated: action.authenticated || false
            })
        case VISIT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case VISIT_BAN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case VISIT_BAN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authenticated: action.authenticated || false
            })
        case VISIT_BAN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}
// We combine the reducers here so that they
// can be left split apart above
const barberApp = combineReducers({
    auth,
    service,
    visit,
    notifications
})



export default barberApp