/* global describe, afterEach, it */

import configureStore from 'redux-mock-store'
import nock from 'nock'
import promise from 'redux-promise'
import { signup, login, logout } from '../actions/user'

const middlewares = [ promise ]
const mockStore = configureStore(middlewares)
const baseUrl = 'http://test.com'

describe('user actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('succesfully signs up a new user', (done) => {
    nock(baseUrl)
      .post('/users', {
        email: 'pizza@gmail.com',
        password: 'pizza'
      })
      .reply(200)

    const action = { type: 'SIGNUP', payload: '' }
    const expectedActions = [ action ]

    const store = mockStore({}, expectedActions, done)
    store.dispatch(signup(baseUrl, 'pizza@gmail.com', 'pizza'))
  })

  it('succesfully logs in a user', (done) => {
    nock(baseUrl)
      .post('/users/login', {
        email: 'pizza@gmail.com',
        password: 'pizza'
      })
      .reply(200)

    const action = { type: 'LOGIN', payload: '' }
    const expectedActions = [ action ]

    const store = mockStore({}, expectedActions, done)
    store.dispatch(login(baseUrl, 'pizza@gmail.com', 'pizza'))
  })

  it('succesfully logs out a user', (done) => {
    nock(baseUrl)
      .matchHeader('Authorization', 'pizzaToken')
      .post('/users/logout')
      .reply(200)

    const action = { type: 'LOGOUT', payload: '' }
    const expectedActions = [ action ]

    const store = mockStore({}, expectedActions, done)
    store.dispatch(logout(baseUrl, {
      token: 'pizzaToken'
    }))
  })
})
