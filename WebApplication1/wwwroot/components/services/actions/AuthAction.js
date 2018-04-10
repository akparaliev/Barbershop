import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user
    }
}

export function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}


export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export function requestRegister(creds) {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function receiveRegister(user) {
    return {
        type: REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user
    }
}

export function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}




export function loginUser(creds) {
    return dispatch => {
        dispatch(requestLogin(creds))
        return axios.post('http://localhost:3000/api/user/login', creds)
            .then(response => {
                let user = {
                    id: response.data.id,
                    name: response.data.name
                };

                localStorage.setItem('id_token', response.data.id_token)
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('user', JSON.stringify(user))

                dispatch(receiveLogin(user))
            })
            .catch(error => {
                dispatch(loginError(error.response.data))
            });
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())

        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')

        dispatch(receiveLogout())
    }
}



export function registerUser(creds) {
    return dispatch => {
        dispatch(requestRegister(creds))
        return axios.post('http://localhost:3000/api/user/register', creds)
            .then(response => {
                let user = {
                    id: response.data.id,
                    name: response.data.name
                };

                localStorage.setItem('id_token', response.data.id_token)
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('user', JSON.stringify(user))

                dispatch(receiveRegister(user))
            })
            .catch(error => {
                dispatch(registerError(error.response.data))
            });;
    }
}
