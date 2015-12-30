import * as userActions from '../actions/user'
import LoginComponent from '../components/Login'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function Login (props) {
  return <LoginComponent {...props} />
}

export default connect(state => ({
}), dispatch => {
  return bindActionCreators(userActions, dispatch)
})(Login)
