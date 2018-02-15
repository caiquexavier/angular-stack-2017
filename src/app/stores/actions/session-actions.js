export const SET_USER_SESSION = 'SET_USER_SESSION'

export function setUserSession (userSession) {
  return {
    type: SET_USER_SESSION,
    userSession
  }
}
