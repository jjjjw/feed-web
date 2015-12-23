import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'
import routes from '../routes'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'

export default (createHistory, initialState = {}) => {
  let finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ routes, createHistory }),
    DevTools.instrument()
  )(createStore)

  let store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
