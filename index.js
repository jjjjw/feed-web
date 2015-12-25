import 'babel-polyfill'
import configureStore from './store/configureStore'
import createHistory from 'history/lib/createBrowserHistory'
import React from 'react'
import Root from './containers/Root'
import { render } from 'react-dom'
import { syncReduxAndRouter } from 'redux-simple-router'

const history = createHistory()
const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(history, store)

render(
  <Root store={store} history={history} />, document.getElementById('root')
)
