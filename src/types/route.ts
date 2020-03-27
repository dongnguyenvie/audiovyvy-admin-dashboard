import { HashRouter, Route, Switch, RouteProps } from 'react-router-dom'

export interface RoutePropsEx extends RouteProps {
  name: String
  uuid?: string
  user?: any
}
