import promise from 'redux-promise'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'

export default (initialState = {}) => {
  let finalCreateStore = compose(
    applyMiddleware(thunk, promise)
  )(createStore)

  let store = finalCreateStore(rootReducer, initialState)

  return store
}
