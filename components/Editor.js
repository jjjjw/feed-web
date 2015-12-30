import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'

export default class Editor extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  handleInput (ev) {
    ev.preventDefault()
    let content = ev.currentTarget.value
    this.setState({ content })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    let { content } = this.state
    this.props.createPost({
      content
    })
  }

  render () {
    return (
      <div className='wrapper'>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <textarea
            onInput={this.handleInput.bind(this)}
            name='post'
            value={this.state.content}/>

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
