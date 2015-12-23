import 'babel-polyfill'
import configureStore from './store/configureStore'
import createHistory from 'history/lib/createBrowserHistory'
import React from 'react'
import Root from './containers/Root'
import { render } from 'react-dom'

const store = configureStore(createHistory, window.__INITIAL_STATE__)

render(
  <Root store={store} />,
  document.getElementById('root')
)
