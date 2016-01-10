import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const error = handleActions({
  'PROFILES_ERROR' (state, action) {
    return action.payload
  },

  'CLEAR_PROFILES_ERROR' (state, action) {
    return null
  }
}, null)

const byId = handleActions({
  'CREATE_PROFILE' (state, action) {
    const profile = action.payload
    return {...state, [profile.id]: profile }
  },

  'LOAD_PROFILES' (state, action) {
    const profiles = action.payload.reduce((obj, profile) => {
      obj[profile.id] = profile
      return obj
    }, {})
    return {...state, ...profiles }
  }
}, {})

export default combineReducers({
  byId,
  error
})
