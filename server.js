import 'babel-core/polyfill'
import App from './containers/App'
import configureStore from './store'
import koa from 'koa'
import nunjucks from 'nunjucks'
import serve from 'koa-static'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

nunjucks.configure('views', { autoescape: true })

const app = koa()
export default app

app.use(serve('public'))

function render() {
  return function* () {
    const store = configureStore()
    let state = {}

    const appString = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )

    this.body = nunjucks.render('index.html', {
      appString,
      initialState: JSON.stringify(state),
      env: process.env
    })
  };
}

app.use(render)

app.listen(3000)
