/*eslint no-unused-vars: "off"*/
import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import * as router from 'react-router-dom'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { IRouteExProps, IDefaultLayoutProps } from '../type'
import { AppAside, AppFooter, AppHeader, AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppBreadcrumb2 as AppBreadcrumb, AppSidebarNav2 as AppSidebarNav } from '@coreui/react'
// sidebar nav config
import navigation from '../../../_nav'
// routes config
import routes from '../../../routes'

const DefaultAside = React.lazy(() => import('./DefaultAside'))
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))
const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

const DEFAULT_ROUTE = '/dashboard'
const DefaultLayout = (props: IDefaultLayoutProps) => {
  let history = useHistory()
  const { t } = useTranslation()
  // Map to translation text
  useEffect(() => {
    navigation.items.forEach((_nav) => {
      _nav.name = t(_nav.name || '')
    })
  }, [])
  const handleSignOut = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    history.push('/login')
  }

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={(e: React.FormEvent<HTMLInputElement>) => handleSignOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense fallback={loading()}>
            <AppSidebarNav navConfig={navigation} {...props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? <Route<IRouteExProps> key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => (route.component ? <route.component {...props} /> : null)} /> : null
                })}
                <Redirect from="/" to={DEFAULT_ROUTE} />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  )
}

export default DefaultLayout
