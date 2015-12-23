import React, { PropTypes } from 'react'
import Signup from './Signup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signup } from '../actions/user'

function Home (props) {
  if (props.user) {
    return (
      <div>
        Hello, {props.user.name}
      </div>
    )
  } else {
    return <Signup {...props} />
  }
}

Home.propTypes = {
  user: PropTypes.object
}

export default connect(state => ({
  user: state.user
}), dispatch => ({
  signup: bindActionCreators(signup, dispatch)
}))(Home)
