import ErrorAlert from '../ErrorAlert'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from '../Form/style.css'

export default class Signup extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange (ev) {
    ev.preventDefault()
    let email = ev.target.value
    this.setState({ email })
  }

  handlePasswordChange (ev) {
    ev.preventDefault()
    let password = ev.target.value
    this.setState({ password })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    let { email, password } = this.state
    this.props.signup(email, password, this.props.location)
  }

  render () {
    return (
      <div className={style.wrapper}>

        <ErrorAlert error={this.props.auth.error} />

        <form onSubmit={this.handleSubmit.bind(this)}>

          <input
            className={style.input}
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            id='email'
            type='email'
            placeholder='Email'
            required
          />

          <input
            className={style.input}
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            id='password'
            type='password'
            placeholder='Password'
            required
          />

          <button
            className={style.submit}
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
  signup: PropTypes.func.isRequired
}
