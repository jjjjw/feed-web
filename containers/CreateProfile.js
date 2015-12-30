import * as profilesActions from '../actions/profiles'
import CreateProfileComponent from '../components/CreateProfile'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadUser } from '../actions/user'
import { pushPath } from 'redux-simple-router'
import { requireAuth } from '../auth'

export default class CreateProfile extends React.Component {

  static load (dispatch, authToken) {
    return dispatch(loadUser(authToken))
  }

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
  auth: state.user.auth
}), dispatch => {
  return {
    createProfile: bindActionCreators(profilesActions.createProfile, dispatch),
    pushPath: bindActionCreators(pushPath, dispatch)
  }
})(CreateProfile)
