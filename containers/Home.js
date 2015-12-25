import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { requireAuth } from '../auth'

export default class Home extends React.Component {

  componentWillMount () {
    requireAuth(this.props.user, this.props.location, this.props.pushPath)
  }

  render () {
    return (
      <div>
        Home
      </div>
    )
  }

}

Home.propTypes = {
  location: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default connect(state => ({
  user: state.user
}), dispatch => ({
  pushPath: bindActionCreators(pushPath, dispatch)
}))(Home)
