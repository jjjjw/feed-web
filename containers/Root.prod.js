import React, { PropTypes } from 'react'
import routes from '../routes'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

function Root (props) {
  return (
    <Provider store={props.store}>
      <Router history={props.history}>
        {routes}
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
