import ViewProfileComponent from '../../components/ViewProfile'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class ViewProfile extends React.Component {

  render () {
    return <ViewProfileComponent {...this.props} />
  }
}

ViewProfile.propTypes = {
  posts: PropTypes.object
}

export default connect(state => ({
  auth: state.user.auth
}), dispatch => ({
  pushPath: bindActionCreators(pushPath, dispatch)
}))(ViewProfile)
