import request from 'superagent'
import { createAction } from 'redux-actions'
import { pushPath } from 'redux-simple-router'

const CREATE_PROFILE = createAction('CREATE_PROFILE')
const LOGIN = createAction('LOGIN')
const LOGOUT = createAction('LOGOUT')
const SIGNUP = createAction('SIGNUP')
const SET_EMAIL = createAction('SET_EMAIL')
const SET_PASSWORD = createAction('SET_PASSWORD')

export const setEmail = SET_EMAIL
export const setPassword = SET_PASSWORD

export function signup (email, password) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

    request
      .post(`${baseUrl}/users`)
      .send({ email, password })
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          let { id, role } = res.body
          dispatch(SIGNUP({ id, role }))
          dispatch(pushPath('/profiles/new'))
        }
      })
  }
}

export function login (email, password, location) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

    request
      .post(`${baseUrl}/users/login`)
      .send({ email, password })
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          let { id, role } = res.body
          let { next } = location.query
          dispatch(LOGIN({ id, role }))
          if (next) {
            dispatch(pushPath(next))
          }
        }
      })
  }
}

export function logout () {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

    request
      .post(`${baseUrl}/users/logout`)
      .send({})
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          dispatch(LOGOUT())
        }
      })
  }
}

export function createProfile (profile) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase
    let { name } = profile

    request
      .post(`${baseUrl}/profiles`)
      .send({ name })
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          let { id } = res.body
          dispatch(CREATE_PROFILE({ id, name }))
        }
      })
  }
}
