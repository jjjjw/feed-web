/* global describe, afterEach, it */

import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { signup, login, logout, createProfile } from '../actions/user'

const apiBase = 'http://test.com'
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)
const storeState = { config: { urls: { apiBase } } }
const token = 'token'
const id = 'userId'
const role = 'user'

describe('user actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('succesfully signs up a new user', (done) => {
    nock(apiBase)
      .post('/users', {
        email: 'pizza@gmail.com',
        password: 'pizza'
      })
      .reply(200, { id, role })

    const signupAction = { type: 'SIGNUP', payload: { id, role } }
    const pushStateAction = {
      'type': '@@reduxReactRouter/historyAPI',
      'payload': {
        'args': [
          null,
          '/profiles/new'
        ],
        'method': 'pushState'
      }
    }
    const expectedActions = [ pushStateAction , signupAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(signup('pizza@gmail.com', 'pizza'))
  })

  it('succesfully logs in a user', (done) => {
    nock(apiBase)
      .post('/users/login', {
        email: 'pizza@gmail.com',
        password: 'pizza'
      })
      .reply(200, { id, role })

    const action = { type: 'LOGIN', payload: { id, role } }
    const expectedActions = [ action ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(login('pizza@gmail.com', 'pizza'))
  })

  it('succesfully logs out a user', (done) => {
    nock(apiBase)
      .post('/users/logout', {})
      .reply(200)

    const action = { type: 'LOGOUT', payload: undefined }
    const expectedActions = [ action ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(logout({
      token: 'pizzaToken'
    }))
  })

  it('succesfully creates a profile', (done) => {
    const id = '1'
    nock(apiBase)
      .post('/profiles', {
        name: 'pizza'
      })
      .reply(200, { id })

    const action = { type: 'CREATE_PROFILE', payload: { id } }
    const expectedActions = [ action ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(createProfile({ name: 'pizza' }))
  })

})
