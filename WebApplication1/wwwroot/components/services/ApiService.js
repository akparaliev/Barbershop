import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/'

function makeRequest(options, authenticated) {
    const client = axios.create({
        baseURL: BASE_URL
    });
    if (authenticated) {
        let token = localStorage.getItem('access_token');
        if (token) {
            options = { ...options, headers: { 'Authorization': `Bearer ${token}` } }
        }
        else {
            throw "No token saved!"
        }
    }

    return client(options)
        .then(response => {
            return response.data;
        }
        ).catch(error => {
            return Promise.reject(error.response || error.message);
        });
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

    const callAPI = action[CALL_API];

    if (callAPI == null) {
        return next(action);
    }

    let { options, types, authenticated } = callAPI;

    const [requestType, successType, errorType] = types;

    return makeRequest(options, authenticated).then(
        response =>
            next({
                response,
                authenticated,
                type: successType
            }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    )
}