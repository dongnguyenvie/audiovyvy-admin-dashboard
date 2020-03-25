/*eslint no-unused-vars: "off"*/
// import React, { useEffect, useState } from 'react'
import { useHistory, generatePath } from 'react-router-dom'

interface IPushParams {
  path: string
  params?: any
  state?: any
}
export const useRouterEx = function() {
  const history = useHistory()
  const push = ({ path = '', params = {}, state = {} }: IPushParams) => {
    if (!path) {
      return
    }
    const _path = generatePath(path, params)
    history.push({
      pathname: _path,
      state: state
    })
  }
  return {
    push
  }
}
