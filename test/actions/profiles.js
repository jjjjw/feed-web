import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { createProfile } from '../../actions/profiles'

const apiBase = 'http://test.com'
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)
const storeState = { config: { urls: { apiBase } } }

describe('profiles actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('succesfully creates a profile', (done) => {
    const id = '1'
    const name = 'pizza'
    nock(apiBase)
      .post('/profiles', {
        name
      })
      .reply(200, { profile: { id, name }})

    const createProfileAction = { type: 'CREATE_PROFILE', payload: { id, name } }
    const pushStateAction = { payload: { avoidRouterUpdate: false, path: '/', replace: false, state: undefined }, type: '@@router/UPDATE_PATH' }
    const expectedActions = [ createProfileAction, pushStateAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(createProfile({ name }))
  })
})
