import App from '../containers/App'
import CreatePost from '../containers/CreatePost'
import CreateProfile from '../containers/CreateProfile'
import Home from '../containers/Home'
import Login from '../containers/Login'
import React from 'react'
import Signup from '../containers/Signup'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='login' component={Login}/>
    <Route path='signup' component={Signup}/>
    <Route path='profiles/new' component={CreateProfile}/>
    <Route path='posts/new' component={CreatePost}/>
  </Route>
)
