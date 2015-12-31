// TODO: should be able to run ES6 in node
import 'babel-polyfill'
import config from 'config'
import koa from 'koa'
import MemoryFS from 'memory-fs'
import path from 'path'
import render from './render'
import serve from 'koa-static'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import webpackMiddleware from 'koa-webpack-dev-middleware'

const app = koa()

// TODO: hot reloading
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  app.use(webpackMiddleware(compiler, {
    quiet: true,
    lazy: false
  }))
} else {
  app.use(serve('public'))
}

app.use(render)

app.listen(config.get('koa.port'))
console.log('App listening on port ' + config.get('koa.port'))

export default app
