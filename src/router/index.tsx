import React, { useRef, useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

interface IBeforeRoute {
  exact?: boolean
  isAuthenticated?: boolean | null
  path: string
  component: React.ComponentType<any>
  name: string
}
const RouteExtension = ({ component: Component, isAuthenticated, ...otherProps }: IBeforeRoute) => {
  // CheckAuthencation
  if (isAuthenticated) {
    console.log(`>>>>>>>>> BeforeRoute`, isAuthenticated)
    console.log(`isAuthenticated`, isAuthenticated)
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

export default RouteExtension
