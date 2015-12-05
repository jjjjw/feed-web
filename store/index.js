import rootReducer from '../reducers'
import routes from '../routes'
import { createStore, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'

export default (createHistory, initialState = {}) => {
  const finalCreateStore = compose(
    reduxReactRouter({ routes, createHistory })
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
