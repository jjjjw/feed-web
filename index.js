import 'babel-polyfill'
import configureStore from './store'
import createHistory from 'history/lib/createBrowserHistory'
import React from 'react'
import Root from './containers/Root'
import { render } from 'react-dom'

const store = configureStore({
  createHistory
})

render(
  <Root store={store} />,
  document.getElementById('root')
)
