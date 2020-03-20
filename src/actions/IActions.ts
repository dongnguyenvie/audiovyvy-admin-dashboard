import { Action } from 'redux'
import keys from './ActionTypeKey'

export interface IGetTestState extends Action {
  readonly type: keys.GET_TEST_STATE
  payload: {
    username: String
    password: String
  }
}

export interface IFetchTestState extends Action {
  readonly type: keys.FETCH_TEST_STATE
  payload: {
    username: String
    password: String
  }
}
