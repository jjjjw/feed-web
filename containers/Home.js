import HeaderComponent from '../components/Header'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { requireAuth } from '../auth'

export default class Home extends React.Component {

  componentWillMount () {
    requireAuth(this.props.auth, this.props.location, this.props.pushPath)
  }

  render () {
    return (
      <div>
        <HeaderComponent {...this.props} />
      </div>
    )
  }

}

Home.propTypes = {
  location: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired,
  auth: PropTypes.object
}

export default connect(state => ({
  auth: state.user.auth,
  profiles: state.profiles
}), dispatch => ({
  pushPath: bindActionCreators(pushPath, dispatch)
}))(Home)
