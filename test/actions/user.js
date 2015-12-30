/* global describe, afterEach, it */

import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { load, signup, login, logout, createProfile } from '../../actions/user'

const apiBase = 'http://test.com'
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)
const storeState = { config: { urls: { apiBase } } }
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
      .reply(200, { user: { id, role }})

    const signupAction = { type: 'SIGNUP', payload: { id, role } }
    const pushStateAction = { payload: { avoidRouterUpdate: false, path: '/profiles/new', replace: false, state: undefined }, type: '@@router/UPDATE_PATH' }
    const expectedActions = [ signupAction, pushStateAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(signup('pizza@gmail.com', 'pizza'))
  })

  it('succesfully logs in a user', (done) => {
    nock(apiBase)
      .post('/users/login', {
        email: 'pizza@gmail.com',
        password: 'pizza'
      })
      .reply(200, { user: { id, role }})

    const loginAction = { type: 'LOGIN', payload: { id, role } }
    const loadProfilesAction = { payload: undefined, type: 'LOAD_PROFILES' }
    const loadUserProfilesAction = { payload: { id: 'userId', role: 'user' }, type: 'LOAD_USER_PROFILES' }
    const expectedActions = [ loginAction, loadProfilesAction, loadUserProfilesAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(login('pizza@gmail.com', 'pizza', { query: {}}))
  })

  it('succesfully loads a current user', (done) => {
    nock(apiBase)
      .get('/users')
      .reply(200, { user: { id, role }})

    const loadUserAction = { type: 'LOAD_USER', payload: { id, role } }
    const loadProfilesAction = { payload: undefined, type: 'LOAD_PROFILES' }
    const loadUserProfilesAction = { payload: { id: 'userId', role: 'user' }, type: 'LOAD_USER_PROFILES' }
    const expectedActions = [ loadUserAction, loadProfilesAction, loadUserProfilesAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(load('pizza@gmail.com', 'pizza', { query: {}}))
  })

  it('succesfully logs in a user and redirects', (done) => {
    nock(apiBase)
      .post('/users/login', {
        email: 'pizza@gmail.com',
        password: 'pizza'
      })
      .reply(200, { user: { id, role }})

    const loginAction = { type: 'LOGIN', payload: { id, role } }
    const loadProfilesAction = { payload: undefined, type: 'LOAD_PROFILES' }
    const loadUserProfilesAction = { payload: { id: 'userId', role: 'user' }, type: 'LOAD_USER_PROFILES' }
    const pushStateAction = { payload: { avoidRouterUpdate: false, path: '/next', replace: false, state: undefined }, type: '@@router/UPDATE_PATH' }
    const expectedActions = [ loginAction, loadProfilesAction, loadUserProfilesAction, pushStateAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(login('pizza@gmail.com', 'pizza', { query: { next: '/next'}}))
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
})
