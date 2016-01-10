import promise from 'redux-promise'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'

export default (initialState = {}) => {
  const finalCreateStore = compose(
    applyMiddleware(thunk, promise)
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  return store
}
