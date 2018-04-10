import {
    LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT_SUCCESS,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../actions/AuthAction'


export function auth(
    state = {
        isFetching: false,
        isAuthenticated: localStorage.getItem('id_token') ? true : false,
        user: localStorage.getItem('id_token') ? JSON.parse(localStorage.getItem('user')) : null
    }, action) {

    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            };

        case REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            };

        default:
            return state;
    }
}
