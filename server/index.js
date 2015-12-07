import 'babel-polyfill'
import configureStore from '../store'
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
      baseUrl: 'http://localhost:3000'
    }
  }

  console.log(this.request.path)
  console.log(this.request.headers.Authorization)

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

app.listen(3000)

export default app
