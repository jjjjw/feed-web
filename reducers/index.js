import posts from './posts'
import profiles from './profiles'
import user from './user'
import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'

const rootReducer = combineReducers({
  config (state = {}) { return state },
  posts,
  profiles,
  routing,
  user
})

export default rootReducer
