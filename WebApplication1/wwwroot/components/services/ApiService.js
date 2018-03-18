import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/'

function callApi(options, authenticated) {
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
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            } else {
                console.error('Error Message:', error.message);
            }
            return Promise.reject(error.response || error.message);
        });
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

    const callAPI = action[CALL_API]

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { options, types, authenticated} = callAPI

    const [requestType, successType, errorType] = types

    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return callApi(options, authenticated).then(
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