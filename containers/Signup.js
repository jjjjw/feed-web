import * as userActions from '../actions/user'
import React from 'react'
import SignupComponent from '../components/Signup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function Signup (props) {
  return <SignupComponent {...props} />
}

export default connect(state => ({
}), dispatch => {
  return bindActionCreators(userActions, dispatch)
})(Signup)