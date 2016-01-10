import HeaderComponent from '../../components/Header'
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { requireAuth } from '../../auth'

class Dashboard extends React.Component {

  componentWillMount () {
    requireAuth(this.props.auth, this.props.location, this.props.pushPath)
  }

  render () {
    return (
      <div>
        <HeaderComponent {...this.props} />
        {this.props.children}
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.object,
  location: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired
}

export default connect(state => ({
  auth: state.user.auth
}), dispatch => ({
  pushPath: bindActionCreators(pushPath, dispatch)
}))(Dashboard)
