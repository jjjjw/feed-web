import request from 'superagent'
import { authorizeRequest } from '../auth'
import { createAction } from 'redux-actions'
import { pushPath } from 'redux-simple-router'

const ActionCreators = {
  clearProfilesError: createAction('CLEAR_PROFILES_ERROR'),
  createProfile: createAction('CREATE_PROFILE'),
  loadProfiles: createAction('LOAD_PROFILES'),
  loadUserProfiles: createAction('LOAD_USER_PROFILES'),
  profilesError: createAction('PROFILES_ERROR')
}

export const clearProfilesError = ActionCreators.clearProfilesError
export const loadProfiles = ActionCreators.loadProfiles
export const loadUserProfiles = ActionCreators.loadUserProfiles
export const profilesError = ActionCreators.profilesError

export function createProfile (profile) {
  return (dispatch, getState) => {
    const baseUrl = getState().config.urls.apiBase
    const { name } = profile

    request
      .post(`${baseUrl}/profiles`)
      .send({ name })
      .use(authorizeRequest())
      .end((err, res) => {
        if (err) {
          const { error } = err.response.body
          dispatch(ActionCreators.profilesError(error))
        } else if (res.ok) {
          const { id } = res.body.profile
          dispatch(ActionCreators.createProfile({ id, name }))
          dispatch(pushPath('/'))
        }
      })
  }
}
