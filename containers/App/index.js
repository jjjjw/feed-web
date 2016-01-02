import React, { PropTypes } from 'react'
import style from './style.css'
import { load as loadUser } from '../../actions/user'

export default class App extends React.Component {

  static load (dispatch, authToken) {
    return dispatch(loadUser(authToken))
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}
