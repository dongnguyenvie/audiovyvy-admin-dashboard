import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RouteExtension from './router'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

// import
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

// Containers
const DefaultLayout = React.lazy(() => import('./modules/DefaultLayout/components/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./modules/pages/login/components/Login'))
const Register = React.lazy(() => import('./modules/pages/register/components/Register'))
const Page404 = React.lazy(() => import('./modules/pages/page404/components/Page404'))
const Page500 = React.lazy(() => import('./modules/pages/page500/components/Page500'))
const HandsontablePage = React.lazy(() => import('./views/Pages/Handsontable'))

function App() {
  return (
    <>
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <RouteExtension exact path="/handsontable" name="Handsontable" component={HandsontablePage} />
            <RouteExtension exact path="/login" name="Page 500" component={Login} />
            <RouteExtension exact path="/register" name="Register Page" component={Register} />
            <RouteExtension exact path="/404" name="Page 404" component={Page404} />
            <RouteExtension exact path="/500" name="Page 500" component={Page500} />
            <RouteExtension path="/" name="Home" isAuth component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
      <ToastContainer />
    </>
  )
}

export default App
