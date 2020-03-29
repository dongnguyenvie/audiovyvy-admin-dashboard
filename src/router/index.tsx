import React, { useRef, useState, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { onSetUser } from '../reducers/authentication/Auth.reducer'
import LocalStorage from '../plugins/localstorage'
import { localStorageKeys } from '../constants'
import { createSelector } from 'reselect'
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
  onSetUser?: Function
}
const RouteExtension = ({ component: Component, isAuth, onGetUser, user, onSetUser = () => {}, ...otherProps }: IBeforeRoute) => {
  let history = useHistory()
  if (isAuth) {
    if (!user.isLogin) {
      const _user = LocalStorage.get(localStorageKeys.AUTH)
      if (_user.isRemember) {
        onSetUser(_user)
      } else {
        history.push('/login')
      }
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
            <Component uuid={_uuid} {...otherProps} user={user}>
              {AfterRoute()}
            </Component>
          </>
        )}
      />
    </>
  )
}

const getUser = (state: any) => state.user
const getUSerState = createSelector([getUser], (user) => {
  return user
})

const mapStateToProps = (state: any) => ({
  user: getUSerState(state)
})
const mapDispatchToProps = {
  onSetUser: onSetUser
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(RouteExtension)
