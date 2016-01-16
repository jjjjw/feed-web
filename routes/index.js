import App from '../containers/App'
import CreateMaterial from '../containers/CreateMaterial'
import React from 'react'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={CreateMaterial}/>
  </Route>
)
