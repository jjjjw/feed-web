import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from './style.css'

export default class Editor extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  handleInput (ev) {
    ev.preventDefault()
    const content = ev.currentTarget.value
    this.setState({ content })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const { content } = this.state
    this.props.createMaterial({
      content
    })
  }

  render () {
    return (
      <div className={style.container}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <textarea
              className={style.textArea}
              onInput={this.handleInput.bind(this)}
              maxLength='1000'
              name='post'
              placeholder='Feed me text...'
              value={this.state.content.text}/>
          </div>

          <button
            className='btn'
            type='submit'
            >
            Feed
          </button>
        </form>
      </div>
    )
  }
}

Editor.propTypes = {
  createMaterial: PropTypes.func.isRequired
}
