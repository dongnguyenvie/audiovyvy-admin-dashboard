import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { RoutePropsEx } from './types/route'
import { RouteProps } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

// import
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login/Login'))
const Register = React.lazy(() => import('./views/Pages/Register'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const HandsontablePage = React.lazy(() => import('./views/Pages/Handsontable'))

function App() {
  return (
    <div>
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/handsontable" render={(props) => <HandsontablePage {...props} />} />
            <Route<RouteProps & { name: String }> exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route<RoutePropsEx> exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
            <Route<RoutePropsEx> exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route<RoutePropsEx> exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route<RoutePropsEx> path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
      <ToastContainer />
    </div>
  )
}

export default App
