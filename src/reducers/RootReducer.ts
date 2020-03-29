import { combineReducers } from 'redux'
import { countReducer } from './test/test.reducer'
import { getUserReducer } from './authentication/Auth.reducer'

export default combineReducers({
  count: countReducer,
  user: getUserReducer
})
