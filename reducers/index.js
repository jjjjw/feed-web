import user from './user'
import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'

const rootReducer = combineReducers({
  config (state = {}) { return state },
  routing,
  user
})

export default rootReducer
