import { handleActions } from 'redux-actions'

export default handleActions({
  'SIGNUP': {
    next (state, action) {
      state = action.payload
      return state
    },

    throw (state, action) {
      return state
    }
  }
}, null)
