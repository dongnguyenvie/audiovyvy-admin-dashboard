import { Redirect, Route, Switch, useHistory, RouteProps } from 'react-router-dom'
import { ReactNode } from 'react'
export interface IRouteExProps extends RouteProps {
  name?: string
}
export interface IDefaultLayoutProps extends RouteProps {
  name?: string
  user: any
  uuid: string
}
interface IDefaultProps {
  children?: ReactNode
}
export interface IDefaultAsideProps extends IDefaultProps {}
export interface IDefaultFooterProps extends IDefaultProps {}
export interface IDefaultHeaderProps extends IDefaultProps {
  onLogout: Function
}
