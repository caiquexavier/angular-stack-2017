import { SET_ADMIN_STATE } from '../actions/admin-actions'
const defaultState = {
  state: {
    users: null
  }
}
export function adminReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_ADMIN_STATE:
      return Object.assign({}, state, {
        state: action.snap
      })
    default:
      return state
  }
}
