import request from 'superagent'
import { authorizeRequest } from '../auth'
import { createAction } from 'redux-actions'

const ActionCreators = {
  createPost: createAction('CREATE_POST'),
  editPost: createAction('EDIT_POST')
}

export const editPost = ActionCreators.editPost

export function createPost (post) {
  return (dispatch, getState) => {
    let baseUrl = getState().config.urls.apiBase
    let profileId = getState().user.profiles.active
    let { content } = post

    request
      .post(`${baseUrl}/posts`)
      .send({ content, profileId })
      .use(authorizeRequest())
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          let { id } = res.body.post
          dispatch(ActionCreators.createPost({ id, content, profileId }))
        }
      })
  }
}
