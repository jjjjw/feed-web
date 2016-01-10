import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from './style.css'

export default class Editor extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      content: {
        text: ''
      }
    }
  }

  handleInput (ev) {
    ev.preventDefault()
    const text = ev.currentTarget.value
    this.setState({ content: { text } })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const { content } = this.state
    this.props.createPost({
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
              maxLength='500'
              name='post'
              placeholder='Write here...'
              value={this.state.content.text}/>
          </div>

          <button
            className='btn'
            type='submit'
            >
            Publish
          </button>
        </form>
      </div>
    )
  }
}

Editor.propTypes = {
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired
}
