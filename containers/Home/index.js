import HomeComponent from '../../components/Home'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { rejectAuth } from '../../auth'

export class Home extends React.Component {

  componentWillMount () {
    rejectAuth(this.props.auth, this.props.location, this.props.pushPath, '/dashboard')
  }

  render () {
    return <HomeComponent {...this.props} />
  }
}

Home.propTypes = {
  location: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired,
  auth: PropTypes.object
}

export default connect(state => ({
  auth: state.user.auth
}), dispatch => ({
  pushPath: bindActionCreators(pushPath, dispatch)
}))(Home)
