export const SET_ADMIN_STATE = 'SET_ADMIN_STATE'

export function setAdminState (snap) {
  return {
    type: SET_ADMIN_STATE,
    snap
  }
}
