import PureComponent from 'react-pure-render/component'
import React from 'react'
import style from './style.css'
import { Link } from 'react-router'

export default class Header extends PureComponent {
  render () {
    return (
      <div className={style.container}>
        <Link className={style.link} to={'/posts/new'}>New post</Link>
      </div>
    )
  }
}
