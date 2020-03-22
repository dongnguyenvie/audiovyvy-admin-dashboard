import { Reducer } from 'redux'
import { IUSER, ActionTypeKeys, ActionTypes, IGetUserAction } from './types'

export const onGetUser = () => {
  return {
    type: ActionTypeKeys.GET_USER
  }
}
const initState = {
  token: 'token-ex',
  isLogin: true,
  count: 0
}
export const getUserReducer: Reducer<IUSER, ActionTypes> = (state = initState, action): IUSER => {
  switch (action.type) {
    case ActionTypeKeys.GET_USER:
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}
