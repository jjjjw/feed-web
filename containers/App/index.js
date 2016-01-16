import React, { PropTypes } from 'react'
import style from './style.css'

export default class App extends React.Component {
  render () {
    return (
      <div className={style.appContainer}>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}
