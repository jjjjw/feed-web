import axios from 'axios'
import { createAction } from 'redux-actions'

function wrapAxios (axiosConfig) {
  return axios(axiosConfig).then(function (res) {
    return res.data
  }).catch(function (res) {
    return { status: res.status }
  })
}

export const signup = createAction('SIGNUP', function (baseUrl, email, password) {
  return wrapAxios({
    method: 'post',
    url: baseUrl + '/users',
    data: {
      email,
      password
    }
  })
})

export const login = createAction('LOGIN', function (baseUrl, email, password) {
  return wrapAxios({
    method: 'post',
    url: baseUrl + '/users/login',
    data: {
      email,
      password
    }
  })
})

export const logout = createAction('LOGOUT', function (baseUrl, user) {
  return wrapAxios({
    method: 'post',
    url: baseUrl + '/users/logout',
    headers: { 'Authorization': user.token }
  })
})
