import {
    SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE,
    SERVICE_DELETE_REQUEST, SERVICE_DELETE_SUCCESS, SERVICE_DELETE_FAILURE,
    SERVICE_VISIT_REQUEST, SERVICE_VISIT_SUCCESS, SERVICE_VISIT_FAILURE,
} from '../ActionService'


export function service(state = {
    isFetching: false,
    services: null,
    authenticated: false
}, action) {
    switch (action.type) {
        case SERVICE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case SERVICE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                services: action.response,
                authenticated: action.authenticated || false
            };
        case SERVICE_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case SERVICE_DELETE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case SERVICE_DELETE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                authenticated: action.authenticated || false
            };
        case SERVICE_DELETE_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case SERVICE_VISIT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case SERVICE_VISIT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                authenticated: action.authenticated || false
            };
        case SERVICE_VISIT_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}

