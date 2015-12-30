import request from 'superagent'
import { authorizeRequest } from '../auth'
import { createAction } from 'redux-actions'
import { loadProfiles, loadUserProfiles } from './profiles'
import { pushPath } from 'redux-simple-router'

const ActionCreators = {
  loadUser: createAction('LOAD_USER'),
  login: createAction('LOGIN'),
  logout: createAction('LOGOUT'),
  signup: createAction('SIGNUP')
}

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
            let user = res.body.user
            let profiles = res.body.profiles
            dispatch(ActionCreators.loadUser(user))
            dispatch(loadProfiles(profiles))
            dispatch(loadUserProfiles(user))
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
          let user = res.body.user
          dispatch(ActionCreators.signup(user))
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
          let user = res.body.user
          let profiles = res.body.profiles
          let { next } = location.query
          dispatch(ActionCreators.login(user))
          dispatch(loadProfiles(profiles))
          dispatch(loadUserProfiles(user))
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
          dispatch(ActionCreators.logout())
        }
      })
  }
}
