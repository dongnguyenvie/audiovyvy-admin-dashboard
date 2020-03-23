import { RouteProps } from 'react-router-dom'

export interface IRegisterProps extends RouteProps {
  uuid?: string
}

export interface IResigerFormValues {
  username: string
  fullName: string
  avatar: string
  email: string
  phone: string
  password: string
  roles: [string]
  confirmPassword: string
}

export interface IRegisterFormProps {
  username?: string
  fullName?: string
  avatar?: string
  email?: string
  phone?: string
  password?: string
  roles?: [string]
  onCreateUser?: Function
}

