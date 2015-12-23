import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'

export default class Signup extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange (field) {
    return ev => {
      this.setState({ [field]: ev.target.value })
    }
  }

  handleSubmit (ev) {
    ev.preventDefault()
    let { email, password } = this.state
    this.props.signup(email, password)
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='title'>Sign up</div>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor='email'>Email</label>

          <input
            className='input'
            value={this.state.email}
            onChange={this.handleChange('email')}
            id='email'
            type='email'
            placeholder='Email'
            required
          />

          <label htmlFor='password'>Password</label>

          <input
            className='input'
            value={this.state.password}
            onChange={this.handleChange('password')}
            id='password'
            type='password'
            placeholder='Password'
            required
          />

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
  signup: PropTypes.func.isRequired
}
