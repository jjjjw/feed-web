import * as profilesActions from '../actions/profiles'
import CreateProfileComponent from '../components/CreateProfile'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadUser } from '../actions/user'
import { pushPath } from 'redux-simple-router'
import { requireAuth } from '../auth'

export default class CreateProfile extends React.Component {

  componentWillMount () {
    requireAuth(this.props.auth, this.props.location, this.props.pushPath)
  }

  render () {
    return (
      <CreateProfileComponent {...this.props} />
    )
  }
}

export default connect(state => ({
  auth: state.user.auth,
  profiles: state.profiles
}), dispatch => {
  let actions = bindActionCreators(profilesActions, dispatch)
  actions.pushPath = bindActionCreators(pushPath, dispatch)
  return actions
})(CreateProfile)
