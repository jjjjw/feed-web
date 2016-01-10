import * as userActions from '../../actions/user'
import LoginComponent from '../../components/Login'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadUser } from '../../actions/user'
import { pushPath } from 'redux-simple-router'
import { rejectAuth } from '../../auth'

class Login extends React.Component {

  componentWillMount () {
    rejectAuth(this.props.auth, this.props.location, this.props.pushPath)
  }

  render () {
    return <LoginComponent {...this.props} />
  }
}

export default connect(state => ({
  auth: state.user.auth
}), dispatch => {
  let actions = bindActionCreators(userActions, dispatch)
  actions.pushPath = bindActionCreators(pushPath, dispatch)
  return actions
})(Login)
