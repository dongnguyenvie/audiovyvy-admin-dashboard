import { Reducer } from 'redux'
import { ActionTypeKeys, IActionTypes, ICount, ISetCount, IGetCount } from './types'

const initState = {
  count: 0
}
export const countReducer: Reducer<ICount, IActionTypes> = (state = initState, action): ICount => {
  switch (action.type) {
    case ActionTypeKeys.GET_COUNT:
      // actio
      return state
    case ActionTypeKeys.SET_COUNT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// export const getCount = (state: ICount): ICount => ({
//   count: state.count
// })

// export const setCount = (payload: ICount): ISetCount => ({
//   type: ActionTypeKeys.SET_COUNT,
//   payload
// })
export const onSetCount = (payload: ICount): ISetCount => {
  return {
    type: ActionTypeKeys.SET_COUNT,
    payload
  }
}
