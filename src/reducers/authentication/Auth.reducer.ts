import { Reducer } from 'redux'
import { IUSER, ActionTypeKeys, ActionTypes, IGetUserAction, ISetUserAction } from './types'

const initState = {
  isLogin: false,
  isRemember: false
}
export const getUserReducer: Reducer<IUSER, ActionTypes> = (state = initState, action): IUSER => {
  switch (action.type) {
    // case ActionTypeKeys.GET_USER:
    //   return state

    case ActionTypeKeys.SET_USER:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

// export const onGetUser = (): IGetUserAction => {
//   return {
//     type: ActionTypeKeys.GET_USER
//   }
// }

export const onSetUser = (payload: IUSER): ISetUserAction => {
  return {
    type: ActionTypeKeys.SET_USER,
    payload
  }
}
