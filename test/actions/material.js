/* global it, describe, afterEach */

import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { createMaterial } from '../../actions/material'

const apiBase = 'http://test.com'
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)
const storeState = { config: { urls: { apiBase } } }

describe('material actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('succesfully creates material', (done) => {
    const content = 'pizza'
    const id = '1'
    nock(apiBase)
      .post('/material', {
        content
      })
      .reply(200, { material: { id } })

    const createMaterialAction = { type: 'CREATE_MATERIAL', payload: { id, content } }
    const expectedActions = [ createMaterialAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(createMaterial({ content }))
  })
})
