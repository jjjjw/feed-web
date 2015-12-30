import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const byId = handleActions({
  'CREATE_POST' (state, action) {
    let post = action.payload
    return {...state, [post.id]: post }
  }
}, {})

const local = handleActions({
  'EDIT_POST' (state, action) {
    let { contents } = action.payload
    return {
      ...state,
      contents
    }
  }
}, {})

export default combineReducers({
  byId,
  local
})
