import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from '../Form/style.css'

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
      <div className={style.wrapper}>

        <form onSubmit={this.handleSubmit.bind(this)}>

          <input
            className={style.input}
            value={this.props.name}
            onChange={this.handleNameChange.bind(this)}
            id='name'
            type='name'
            placeholder='Username'
            required
          />

          <button
            className={style.submit}
            type='submit'
            >
            Create profile
          </button>
        </form>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
}
