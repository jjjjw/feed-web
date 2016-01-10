import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { createPost } from '../../actions/posts'

const apiBase = 'http://test.com'
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)
const profileId = '2'
const storeState = { config: { urls: { apiBase } }, user: { profiles: { active: profileId } } }

describe('posts actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('succesfully creates a post', (done) => {
    const content = { text: 'pizza' }
    const id = '1'
    nock(apiBase)
      .post('/posts', {
        content,
        profileId
      })
      .reply(200, { post: { id }})

    const createPostAction = { type: 'CREATE_POST', payload: { content, profileId, id } }
    const expectedActions = [ createPostAction ]

    const store = mockStore(storeState, expectedActions, done)
    store.dispatch(createPost({ content }))
  })
})
