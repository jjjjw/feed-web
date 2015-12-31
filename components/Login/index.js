import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from './style.css'
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
    this.props.login(email, password, this.props.location)
  }

  render () {
    return (
      <div className={style.wrapper}>
        <div className='title'>Log in</div>

        <form onSubmit={this.handleSubmit.bind(this)}>

          <label htmlFor='email'>Email</label>

          <input
            className='input'
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            id='email'
            type='email'
            placeholder='Email'
            required
          />

          <label htmlFor='password'>Password</label>

          <input
            className='input'
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            id='password'
            type='password'
            placeholder='Password'
            required
          />

          <button
            className={style.action}
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
  login: PropTypes.func.isRequired
}
