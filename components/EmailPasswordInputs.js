import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'

export default class EmailPasswordInputs extends PureComponent {

  handleEmailChange (ev) {
    ev.preventDefault()
    let email = ev.target.value
    this.props.setEmail(email)
  }

  handlePasswordChange (ev) {
    ev.preventDefault()
    let password = ev.target.value
    this.props.setPassword(password)
  }

  render () {
    return (
      <div className='wrapper'>

        <label htmlFor='email'>Email</label>

        <input
          className='input'
          value={this.props.email}
          onChange={this.handleEmailChange.bind(this)}
          id='email'
          type='email'
          placeholder='Email'
          required
        />

        <label htmlFor='password'>Password</label>

        <input
          className='input'
          value={this.props.password}
          onChange={this.handlePasswordChange.bind(this)}
          id='password'
          type='password'
          placeholder='Password'
          required
        />

      </div>
    )
  }
}

EmailPasswordInputs.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}
