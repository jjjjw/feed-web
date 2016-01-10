import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import style from './style.css'

const messages = {
  'DUPLICATE_EMAIL': 'Email already in use.',
  'DUPLICATE_NAME': 'Username already in use.',
  'INCORRECT_INFO': 'Incorrect email or password.',
  'INVALID_EMAIL': 'Invalid email.',
  'INVALID_PASSWORD': 'Password must be at least 8 characters.'
}

function getMessage (type) {
   const message = messages[type]
   if (!message) {
    return 'Unknown error.'
   }
   return message
}

export default class ErrorAlert extends PureComponent {

  render () {
    if (this.props.error) {
      return (
        <div className={style.container}>
          {getMessage(this.props.error.type)}
        </div>
      )
    } else {
      return <div className={style.container}/>
    }
  }
}

ErrorAlert.propTypes = {
  error: PropTypes.object,
}
