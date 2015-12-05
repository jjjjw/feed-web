import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

function Root (props) {
  return (
    <Provider store={props.store}>
      <ReduxRouter />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
