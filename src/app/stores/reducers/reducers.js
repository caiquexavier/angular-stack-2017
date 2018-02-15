import { combineReducers } from 'redux'
import { sessionReducer } from './session-reducer.js'
import { adminReducer } from './admin-reducer.js'

export const rootReducer = combineReducers({
  session: sessionReducer,
  admin: adminReducer
})
