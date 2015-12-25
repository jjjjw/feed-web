import * as userActions from '../actions/user'
import LoginComponent from '../components/Login'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function Login (props) {
  return <LoginComponent {...props} />
}

export default connect(state => ({
  email: state.user.email,
  password: state.user.password
}), dispatch => {
  return bindActionCreators(userActions, dispatch)
})(Login)
