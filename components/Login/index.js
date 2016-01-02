import ErrorAlert from '../ErrorAlert'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from '../Form/style.css'
import { Link } from 'react-router'

export default class Login extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange (ev) {
    ev.preventDefault()
    if (this.props.auth.error) {
      this.props.clearAuthError()
    }
    let email = ev.target.value
    this.setState({ email })
  }

  handlePasswordChange (ev) {
    ev.preventDefault()
    if (this.props.auth.error) {
      this.props.clearAuthError()
    }
    let password = ev.target.value
    this.setState({ password })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    let { email, password } = this.state
    this.props.login(email, password, this.props.location)
  }

  render () {
    return (
      <div className={style.wrapper}>

        <ErrorAlert error={this.props.auth.error} />

        <form onSubmit={this.handleSubmit.bind(this)}>

          <div>
            <input
              className={style.input}
              value={this.state.email}
              onChange={this.handleEmailChange.bind(this)}
              id='email'
              type='email'
              placeholder='Email'
              required
            />
          </div>

          <div>
            <input
              className={style.input}
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
              id='password'
              type='password'
              placeholder='Password'
              required
            />
          </div>

          <button
            className={style.submit}
            type='submit'
            >
            Log in
          </button>
          <div className={style.linkWrapper}>
            Or <Link to={'/signup'}>sign up</Link>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}
