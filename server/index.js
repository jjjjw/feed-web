import 'babel-polyfill'
import config from 'config'
import configureStore from '../store/configureStore'
import createHistory from 'history/lib/createMemoryHistory'
import koa from 'koa'
import less from 'koa-less'
import nunjucks from 'nunjucks'
import React from 'react'
import Root from '../containers/Root'
import serve from 'koa-static'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import webpackMiddleware from 'koa-webpack-dev-middleware'
import { renderToString } from 'react-dom/server'

nunjucks.configure('views', { autoescape: true })

const app = koa()

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(webpack(webpackConfig)))
} else {
  app.use(serve('public/js'))
}

app.use(less('./style', {
  dest: __dirname + '/public/style',
  force: process.env.NODE_ENV === 'development',
  once: process.env.NODE_ENV === 'production'
}))

app.use(serve('public/style'))

function * render () {
  let initialState = {
    config: {
      urls: {
        apiBase: config.get('urls.apiBase'),
        webBase: config.get('urls.webBase')
      }
    },
    user: null
  }

  console.log(this.request.path)

  const store = configureStore(
    createHistory,
    initialState
  )

  const appString = renderToString(<Root store={store} />)

  this.body = nunjucks.render('index.html', {
    appString,
    initialState: JSON.stringify(initialState),
    env: process.env.NODE_ENV
  })
}

app.use(render)

app.listen(config.get('koa.port'))
console.log('App listening on port ' + config.get('koa.port'))

export default app
