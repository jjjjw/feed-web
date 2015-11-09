import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'


function noop(state = {}, action) {
  return state
}

const rootReducer = combineReducers({
  router
})

export default rootReducer
