import App from '../containers/App'
import Home from '../components/Home'
import React from 'react'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
  </Route>
)
