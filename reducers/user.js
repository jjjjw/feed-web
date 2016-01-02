import { combineReducers } from 'redux'
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

// user_id === user.id
const all = handleActions({
  'CREATE_PROFILE' (state, action) {
    let { id } = action.payload
    return [...state, id]
  },

  'LOAD_USER_PROFILES' (state, action) {
    return [...state, ...action.payload.profiles]
  }
}, [])

// user_id === user.id && (active === true)
const active = handleActions({
  'CREATE_PROFILE' (state, action) {
    if (!state) {
      let { id } = action.payload
      return id
    } else {
      return state
    }
  },

  'LOAD_USER_PROFILES' (state, action) {
    if (action.payload.activeProfile) {
      return action.payload.activeProfile
    } else {
      return state
    }
  }
}, null)

const profiles = combineReducers({
  active,
  all
})

const auth = handleActions({
  'AUTH_ERROR' (state, action) {
    return { ...state, error: action.payload }
  },

  'CLEAR_AUTH_ERROR' (state, action) {
    return { ...state, error: null }
  },

  'LOAD_USER': handleAuthenticated,

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

export default combineReducers({
  auth,
  profiles
})
