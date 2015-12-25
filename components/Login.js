import PureComponent from 'react-pure-render/component'
import EmailPasswordInputs from './EmailPasswordInputs'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Login extends PureComponent {

  handleSubmit (ev) {
    ev.preventDefault()
    let { email, password, location } = this.props
    this.props.login(email, password, location)
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='title'>Log in</div>

        <form onSubmit={this.handleSubmit.bind(this)}>

          <EmailPasswordInputs {...this.props} />

          <button
            className='btn'
            type='submit'
            >
            Login
          </button>
          <div>
            <Link to={'/signup'}>Or create an account</Link>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func.isRequired
}
