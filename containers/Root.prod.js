import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

function Root (props) {
  return (
    <Provider store={props.store}>
      {props.router}
    </Provider>
  )
}

Root.propTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default Root
