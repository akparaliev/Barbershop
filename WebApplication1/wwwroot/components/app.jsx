import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Layout from './pages/Layout.jsx'
import Main from './pages/Main.jsx'
import Services from './pages/Services.jsx'
import History from './pages/History.jsx'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import barberApp from './services/ReducerService'
import thunkMiddleware from 'redux-thunk'
import api from './services/ApiService'



let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(barberApp)

let rootElement = document.getElementById('content')

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Main}></IndexRoute>
                 <Route path="services" component={Services}>   </Route>
                 <Route path="history" component={History}>   </Route>
                 
            </Route>
        </Router>
    </Provider>,
    rootElement
)