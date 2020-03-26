import React, { useRef, useState, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
// import { onGetUser } from '../reducers/authentication/Auth.reducer'
// import { toast } from 'react-toastify'

interface IBeforeRoute {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
  name: string
  isAuth?: boolean
  onGetUser?: Function
  user?: any
}
const RouteExtension = ({ component: Component, isAuth, onGetUser, user, ...otherProps }: IBeforeRoute) => {
  let history = useHistory()
  if (isAuth) {
    if (!user.isLogin) {
      history.push('/login')
    }
  }

  const AfterRoute = () => {
    console.log(`>>>>>>>>> AfterRoute`, otherProps)
  }

  const _uuid = uuidv4()
  return (
    <>
      <Route
        render={(otherProps) => (
          <>
            <Component uuid={_uuid} {...otherProps}>
              {AfterRoute()}
            </Component>
          </>
        )}
      />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user
})
const mapDispatchToProps = {
  // onGetUser: onGetUser
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(RouteExtension)
