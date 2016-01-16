import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const byId = handleActions({
  'CREATE_MATERIAL' (state, action) {
    const material = action.payload
    return { ...state, [material.id]: material }
  }
}, {})

export default combineReducers({
  byId
})
