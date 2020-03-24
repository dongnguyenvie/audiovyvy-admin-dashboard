import { Redirect, Route, Switch, useHistory, RouteProps } from 'react-router-dom'
import { ReactNode } from 'react'
export interface IRouteExProps extends RouteProps {
  name?: string
}
export interface IDefaultLayoutProps extends RouteProps {
  name?: string
}
export interface IDefaultAsideProps {
  children?: ReactNode
}
