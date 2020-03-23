import { RouteProps } from 'react-router-dom'

export interface ILoginFormValues {
  username: string
  password: string
  message?: String
  rememberMe: boolean
}
export interface OtherProps {}
export interface ILoginFormProps {
  initialUsername?: string
  initialPassword?: string
  initialRememberMe?: boolean
  onLogin: Function
  message?: String
  onCallback: Function
}

export interface ILoginProps extends RouteProps {
  uuid?: string
}

export enum loginActions {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}
