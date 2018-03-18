import {
    VISIT_REQUEST, VISIT_SUCCESS, VISIT_FAILURE,
    VISIT_BAN_REQUEST, VISIT_BAN_SUCCESS, VISIT_BAN_FAILURE
} from '../actions/VisitAction'




export function visit(state = {
    isFetching: false,
    visits: null,
    authenticated: false
}, action) {
    switch (action.type) {
        case VISIT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case VISIT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                visits: action.response,
                authenticated: action.authenticated || false
            };
        case VISIT_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case VISIT_BAN_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case VISIT_BAN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                authenticated: action.authenticated || false
            };
        case VISIT_BAN_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}

