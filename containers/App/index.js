import React, { PropTypes } from 'react'
import style from './style.css'

export default function App (props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object
}
