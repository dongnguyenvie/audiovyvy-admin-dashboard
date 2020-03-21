export enum ActionTypeKeys {
  GET_USER = 'GET_USER'
}

export interface IUSER {
  token: string
  isLogin: boolean
  count: number
}

export interface IGetUserAction {
  type: ActionTypeKeys.GET_USER
  payload: IUSER
}

export type ActionTypes = IGetUserAction
