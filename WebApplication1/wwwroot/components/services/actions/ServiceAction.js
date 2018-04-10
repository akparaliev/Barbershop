import { CALL_API } from '../ApiService'
import axios from 'axios'

export const SERVICE_REQUEST = 'SERVICE_REQUEST'
export const SERVICE_SUCCESS = 'SERVICE_SUCCESS'
export const SERVICE_FAILURE = 'SERVICE_FAILURE'

export function fetchServices() {
    return {
        [CALL_API]: {
            authenticated: true,
            types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
            options: {
                method: 'GET',
                url: 'service'
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

export const SERVICE_DELETE_REQUEST = 'SERVICE_DELETE_REQUEST'
export const SERVICE_DELETE_SUCCESS = 'SERVICE_DELETE_SUCCESS'
export const SERVICE_DELETE_FAILURE = 'SERVICE_DELETE_FAILURE'

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

export const SERVICE_VISIT_REQUEST = 'SERVICE_VISIT_REQUEST'
export const SERVICE_VISIT_SUCCESS = 'SERVICE_VISIT_SUCCESS'
export const SERVICE_VISIT_FAILURE = 'SERVICE_VISIT_FAILURE'

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

