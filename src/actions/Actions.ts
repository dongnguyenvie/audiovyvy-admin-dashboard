import keys from './ActionTypeKey'
import * as IActions from './IActions'
import { ITestState } from '../models/ITestState'

// import { ICurrentUserState } from '../models/IUserState'
// import { IAppState, IAppTable } from '../models/IAppState'

export function getTestState({ username = '', password = '' }: ITestState): IActions.IGetTestState {
  return {
    type: keys.GET_TEST_STATE,
    payload: {
      username,
      password
    }
  }
}

export function fetchTestState({ username = '', password = '' }: ITestState): IActions.IFetchTestState {
  return {
    type: keys.FETCH_TEST_STATE,
    payload: {
      username,
      password
    }
  }
}
