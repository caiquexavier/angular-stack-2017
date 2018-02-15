import { SET_USER_SESSION } from '../actions/session-actions'
const defaultState = {
  userSession: null
}
export function sessionReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_USER_SESSION:
      return Object.assign({}, state, {
        userSession: action.userSession
      })
    default:
      return state
  }
}
