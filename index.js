import 'babel-polyfill'
import configureStore from './store/configureStore'
import createHistory from 'history/lib/createBrowserHistory'
import React from 'react'
import Root from './containers/Root'
import routes from './routes'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'

const history = createHistory()
const store = configureStore(window.__INITIAL_STATE__)

let router = <Router history={history}>{routes}</Router>

render(
  <Root store={store} router={router} />, document.getElementById('root')
)

syncReduxAndRouter(history, store)
