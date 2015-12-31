import config from 'config'
import configureStore from '../store/configureStore'
import createHistory from 'history/lib/createMemoryHistory'
import nunjucks from 'nunjucks'
import React from 'react'
import Root from '../containers/Root'
import routes from '../routes'
import thunkify from 'thunkify'
import { ActionCreators as DevToolsActionCreators } from 'redux-devtools/lib/instrument'
import { match, RoutingContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { syncReduxAndRouter } from 'redux-simple-router'

const matchRoute = thunkify(match)
nunjucks.configure('views', { autoescape: true })

export default function * render () {
  const [redirectLocation, renderProps] = yield matchRoute({ routes, location: this.request.path })

  if (redirectLocation) {
    this.redirect(redirectLocation.pathname + redirectLocation.search)
  } else if (renderProps) {
    const initialState = {
      config: {
        urls: {
          apiBase: config.get('urls.apiBase'),
          webBase: config.get('urls.webBase')
        }
      }
    }
    const authToken = this.cookies.get(config.get('jwt.cookie'))
    const history = createHistory()
    const store = configureStore(initialState)
    history.push(this.request.path)
    syncReduxAndRouter(history, store)

    yield Promise.all(renderProps.components.map(component => {
      if (component.load) {
        return component.load(store.dispatch, authToken)
      }
    }))

    if (process.env.NODE_ENV === 'development') {
      store.liftedStore.dispatch(DevToolsActionCreators.commit())
    }

    const router = <RoutingContext {...renderProps} />
    const appString = renderToString(<Root store={store} router={router} />)
    const pushedPath = store.getState().routing.path

    if (this.request.path !== pushedPath) {
      this.redirect(pushedPath)
    }

    this.body = nunjucks.render('index.html', {
      appString,
      initialState: JSON.stringify(store.getState()),
      env: process.env.NODE_ENV
    })
  } else {
    this.status = 404
  }
}
