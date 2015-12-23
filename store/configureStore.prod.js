import rootReducer from '../reducers'
import routes from '../routes'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'

export default (createHistory, initialState = {}) => {
  let finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ routes, createHistory })
  )(createStore)

  let store = finalCreateStore(rootReducer, initialState)

  return store
}
