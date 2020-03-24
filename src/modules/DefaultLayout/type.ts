import { Redirect, Route, Switch, useHistory, RouteProps } from 'react-router-dom'

export interface IRouteExProps extends RouteProps {
    name?: string
}
export interface IDefaultLayoutProps extends RouteProps {
    name?: string
}