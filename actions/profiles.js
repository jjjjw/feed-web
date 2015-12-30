import request from 'superagent'
import { authorizeRequest } from '../auth'
import { createAction } from 'redux-actions'
import { pushPath } from 'redux-simple-router'

const ActionCreators = {
  createProfile: createAction('CREATE_PROFILE'),
  loadProfiles: createAction('LOAD_PROFILES'),
  loadUserProfiles: createAction('LOAD_USER_PROFILES')
}

export const loadProfiles = ActionCreators.loadProfiles
export const loadUserProfiles = ActionCreators.loadUserProfiles

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
          let { id } = res.body.profile
          dispatch(ActionCreators.createProfile({ id, name }))
          dispatch(pushPath('/'))
        }
      })
  }
}
