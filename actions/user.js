import cookie from 'cookie'
import request from 'superagent'
import { createAction } from 'redux-actions'
import { pushState } from 'redux-router'

const CREATE_PROFILE = createAction('CREATE_PROFILE')
const LOGIN = createAction('LOGIN')
const LOGOUT = createAction('LOGOUT')
const SIGNUP = createAction('SIGNUP')

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
          let { token, id, role } = res.body
          dispatch(pushState(null, '/profiles/new'))
          dispatch(SIGNUP({ id, role }))
        }
      })
  }
}

export function login (email, password) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

    request
      .post(`${baseUrl}/users/login`)
      .send({ email, password })
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          let { token, id, role } = res.body
          dispatch(LOGIN({ id, role }))
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

export function createProfile (name) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

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
