import React, { Component, ComponentType } from 'react'
import { HashRouter, Route, Switch, RouteProps } from 'react-router-dom'
import { RoutePropsEx } from './types/route'
// import '../node_modules/@coreui/icons/css/coreui-icons.css';
// import 'flag-icon-css/css/flag-icon.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import 'simple-line-icons/css/simple-line-icons.css';
// import '@coreui/coreui/scss/coreui.scss'
// import '@coreui/coreui/scss/_dropdown-menu-right.scss'
import './App.scss'
import '@coreui/coreui/scss/coreui.scss'
// import
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'))
const Register = React.lazy(() => import('./views/Pages/Register'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))

function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route<RoutePropsEx> exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route<RoutePropsEx> exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
          <Route<RoutePropsEx> exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route<RoutePropsEx> exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route<RoutePropsEx> path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
