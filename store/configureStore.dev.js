import DevTools from '../containers/DevTools'
import promise from 'redux-promise'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'

export default (initialState = {}) => {
  const finalCreateStore = compose(
    applyMiddleware(thunk, promise),
    DevTools.instrument()
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
