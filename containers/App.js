import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

function App (props) {
  return (
    <div>
      Hello world
      {props.children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object
}

export default connect(state => ({

}))(App)
