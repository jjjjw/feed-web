import material from './material'
import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'

const rootReducer = combineReducers({
  config (state = {}) { return state },
  material,
  routing
})

export default rootReducer
