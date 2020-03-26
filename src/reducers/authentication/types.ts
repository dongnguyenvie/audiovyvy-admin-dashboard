export enum ActionTypeKeys {
  GET_USER = 'GET_USER',
  SET_USER = 'SET_USER'
}
export interface IUSER {
  username?: string
  fullName?: string
  avatar?: string
  email?: string
  phone?: string
  count?: number
  roles?: Array<string>
  isLogin: boolean,
  isRemember: boolean
}

export interface IGetUserAction {
  type: ActionTypeKeys.GET_USER
  payload?: IUSER
}

export interface ISetUserAction {
  type: ActionTypeKeys.SET_USER
  payload?: IUSER
}

export type ActionTypes = IGetUserAction | ISetUserAction
