import user from './user'
import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'

const rootReducer = combineReducers({
  config (state = {}) { return state },
  router,
  user
})

export default rootReducer
