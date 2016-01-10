import DevTools from '../DevTools'
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

function Root (props) {
  return (
    <Provider store={props.store}>
      <div>
        {props.router}
        <DevTools />
      </div>
    </Provider>
  )
}

Root.propTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default Root
