import { combineReducers } from 'redux'
import { testReducer } from './test/test.reducer'
import { getUserReducer } from './authentication/Auth.reducer'
export default combineReducers({
  test: testReducer,
  user: getUserReducer
})
