import 'babel-polyfill'
import configureStore from '../store'
import createHistory from 'history/lib/createMemoryHistory'
import koa from 'koa'
import nunjucks from 'nunjucks'
import React from 'react'
import Root from '../containers/Root'
import serve from 'koa-static'
import { renderToString } from 'react-dom/server'


nunjucks.configure('views', { autoescape: true })

const app = koa()

app.use(serve('public'))

function* render() {
  let initialState = {}
  const store = configureStore({
    createHistory,
    initialState
  })

  const appString = renderToString(<Root store={store} />)

  this.body = nunjucks.render('index.html', {
    appString,
    initialState: JSON.stringify(initialState),
    env: process.env
  })
}

app.use(render)

app.listen(3000)

export default app
