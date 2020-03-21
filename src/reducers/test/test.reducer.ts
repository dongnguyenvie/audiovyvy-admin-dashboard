import { Reducer } from 'redux'
import ActionTypeKeys from '../../actions/ActionTypeKey'
import ActionTypes from '../../actions/ActionTypes'
import { IGetTestState } from '../../actions/IActions'
import { ITestState } from '../../models/ITestState'

export const testReducer: Reducer<ITestState, ActionTypes> = (state: ITestState = { username: '', password: '' }, action: ActionTypes): ITestState => {
  switch (action.type) {
    case ActionTypeKeys.GET_TEST_STATE:
      return _getTestState(state, action)
    default:
      return state
  }
}

function _getTestState(state: ITestState, action: IGetTestState): ITestState {
  state = action.payload
  return action.payload
}
