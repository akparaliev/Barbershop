import { CALL_API } from './ApiService'
import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin
    (creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user:user
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))
        return axios.post('http://localhost:63282/api/user/login', creds)
            .then(response => {
                    let user = { id: response.data.id, name: response.data.name };
                    localStorage.setItem('id_token', response.data.id_token)
                    localStorage.setItem('access_token', response.data.access_token)
                    localStorage.setItem('user', JSON.stringify(user))
                    dispatch(receiveLogin(user))
                }
            ).catch(error => {
                dispatch(loginError(error.response.data))
            });
    }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}


// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_name')
        dispatch(receiveLogout())
    }
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function requestRegister(creds) {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveRegister(user) {
    return {
        type: REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user
    }
}

function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}



export function registerUser(creds) {
    return dispatch => {
        dispatch(requestRegister(creds))
        return axios.post('http://localhost:63282/api/user/register', creds)
            .then(response => {
                let user = { id: response.data.id, name: response.data.name };
                localStorage.setItem('id_token', response.data.id_token)
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('user', JSON.stringify(user))
                dispatch(receiveRegister(user))
            }
            ).catch(error => {
                dispatch(registerError(error.response.data))
            });;
    }
}




export const SERVICE_REQUEST = 'SERVICE_REQUEST'
export const SERVICE_SUCCESS = 'SERVICE_SUCCESS'
export const SERVICE_FAILURE = 'SERVICE_FAILURE'
export const SERVICE_DELETE_REQUEST = 'SERVICE_DELETE_REQUEST'
export const SERVICE_DELETE_SUCCESS = 'SERVICE_DELETE_SUCCESS'
export const SERVICE_DELETE_FAILURE = 'SERVICE_DELETE_FAILURE'
export const SERVICE_VISIT_REQUEST ='SERVICE_VISIT_REQUEST'
export const SERVICE_VISIT_SUCCESS ='SERVICE_VISIT_SUCCESS'
export const SERVICE_VISIT_FAILURE ='SERVICE_VISIT_FAILURE'


// Same API middlware is used to get a
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchServices() {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
            options: {
                method: 'GET',
                url:'service'
            }  
        }
    }
}

export function addService(data) {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
            options: {
                method: 'POST',
                url: 'service',
                data: data
            }
        }
    }
}

export function deleteService(id) {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [SERVICE_DELETE_REQUEST, SERVICE_DELETE_SUCCESS, SERVICE_DELETE_FAILURE],
            options: {
                method: 'DELETE',
                url: `service/${id}`
            }
        }
    }
}


export function addServiceVisit(data) {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [SERVICE_VISIT_REQUEST, SERVICE_VISIT_SUCCESS, SERVICE_VISIT_FAILURE],
            options: {
                method: 'POST',
                url: 'visit',
                data: data
            }
        }
    }
}


export const VISIT_REQUEST = 'VISIT_REQUEST'
export const VISIT_SUCCESS = 'VISIT_SUCCESS'
export const VISIT_FAILURE = 'VISIT_FAILURE'

export function fetchVisits(userId) {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [VISIT_REQUEST, VISIT_SUCCESS, VISIT_FAILURE],
            options: {
                method: 'GET',
                url: 'visit',
                params: { userId: userId }
            }
        }
    }
}


export const VISIT_BAN_REQUEST ='VISIT_BAN_REQUEST'
export const VISIT_BAN_SUCCESS = 'VISIT_BAN_SUCCESS'
export const VISIT_BAN_FAILURE = 'VISIT_BAN_FAILURE'

export function cancelServiceVisit(id) {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [VISIT_BAN_REQUEST, VISIT_BAN_SUCCESS, VISIT_BAN_FAILURE],
            options: {
                method: 'PUT',
                url: `visit/cancel/${id}`
            }
        }
    }
}
