import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'

export default class CreateProfile extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  handleNameChange (ev) {
    ev.preventDefault()
    let name = ev.target.value
    this.setState({ name })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    let profile = { name: this.state.name }
    this.props.createProfile(profile)
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='title'>Create profile</div>

        <form onSubmit={this.handleSubmit.bind(this)}>

          <label htmlFor='name'>Name</label>

          <input
            className='input'
            value={this.props.name}
            onChange={this.handleNameChange.bind(this)}
            id='name'
            type='name'
            placeholder='Name'
            required
          />

          <button
            className='btn'
            type='submit'
            >
            Create
          </button>
        </form>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
}
