import { handleActions } from 'redux-actions'

const handleAuthenticated = {
  next (state, action) {
    return {
      id: action.payload.id,
      role: action.payload.role,
      isAuthenticated: true
    }
  },

  throw (state, action) {
    return state
  }
}

export default handleActions({
  'SET_EMAIL' (state, action) {
    return Object.assign({}, state, { email: action.payload })
  },

  'SET_PASSWORD' (state, action) {
    return Object.assign({}, state, { password: action.payload })
  },

  'SIGNUP': handleAuthenticated,

  'LOGIN': handleAuthenticated,

  'LOGOUT': {
    next (state, action) {
      return {}
    },

    throw (state, action) {
      return state
    }
  }
}, {})
