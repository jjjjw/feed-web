import 'babel-polyfill'
import config from 'config'
import koa from 'koa'
import MemoryFS from 'memory-fs'
import path from 'path'
import render from './render'
import serve from 'koa-static'

const app = koa()

app.use(serve('public'))
app.use(render)

app.listen(config.get('koa.port'))
console.log('App listening on port ' + config.get('koa.port'))

export default app
