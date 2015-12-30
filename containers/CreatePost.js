import * as postsActions from '../actions/posts'
import EditorComponent from '../components/Editor'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadUser } from '../actions/user'
import { pushPath } from 'redux-simple-router'
import { requireAuth } from '../auth'

export default class CreatePost extends React.Component {

  static load (dispatch, authToken) {
    return dispatch(loadUser(authToken))
  }

  componentWillMount () {
    requireAuth(this.props.auth, this.props.location, this.props.pushPath)
  }

  render () {
    return (
      <EditorComponent {...this.props} />
    )
  }
}

export default connect(state => ({
  auth: state.user.auth,
  post: state.posts.local
}), dispatch => {
  let actions = bindActionCreators(postsActions, dispatch)
  actions.pushPath = bindActionCreators(pushPath, dispatch)
  return actions
})(CreatePost)
