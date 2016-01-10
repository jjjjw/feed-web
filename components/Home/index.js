import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {

  render () {
    return (
      <div>
        Welcome
        <Link to={'/signup'}>Sign up</Link>
        <Link to={'/login'}>Log in</Link>
      </div>
    )
  }
}
