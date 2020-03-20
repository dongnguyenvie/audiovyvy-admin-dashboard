import { combineReducers } from 'redux'
import { testReducer } from './test/test.reducer'

export default combineReducers({
  test: testReducer
})
