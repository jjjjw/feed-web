import EmailPasswordInputs from './EmailPasswordInputs'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'

export default class Signup extends PureComponent {

  handleSubmit (ev) {
    ev.preventDefault()
    let { email, password } = this.props
    this.props.signup(email, password)
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='title'>Sign up</div>

        <form onSubmit={this.handleSubmit.bind(this)}>

          <EmailPasswordInputs {...this.props} />

          <button
            className='btn'
            type='submit'
           >
            Sign up
          </button>
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  signup: PropTypes.func.isRequired
}
