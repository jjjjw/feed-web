import request from 'superagent'
import { authorizeRequest } from '../auth'
import { createAction } from 'redux-actions'
import { pushPath } from 'redux-simple-router'

const CREATE_PROFILE = createAction('CREATE_PROFILE')
const LOGIN = createAction('LOGIN')
const LOGOUT = createAction('LOGOUT')
const SIGNUP = createAction('SIGNUP')
const SET_EMAIL = createAction('SET_EMAIL')
const SET_PASSWORD = createAction('SET_PASSWORD')
const LOAD = createAction('LOAD')

export const setEmail = SET_EMAIL
export const setPassword = SET_PASSWORD

export function load (authToken) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

    return new Promise((resolve, reject) => {
      request
        .get(`${baseUrl}/users`)
        .use(authorizeRequest(authToken))
        .end((err, res) => {
          if (err) {
            resolve()
          } else if (res.ok) {
            let { id, role } = res.body
            let user = { id, role }
            dispatch(LOAD(user))
            resolve()
          }
        })
    })
  }
}

export function signup (email, password) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase

    request
      .post(`${baseUrl}/users`)
      .send({ email, password })
      .use(authorizeRequest())
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
      .use(authorizeRequest())
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
      .use(authorizeRequest())
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
      .use(authorizeRequest())
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
