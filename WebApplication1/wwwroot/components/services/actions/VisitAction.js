import { CALL_API } from '../ApiService'
import axios from 'axios';


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


export const VISIT_BAN_REQUEST = 'VISIT_BAN_REQUEST'
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
