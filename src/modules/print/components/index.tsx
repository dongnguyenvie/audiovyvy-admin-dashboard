import React from 'react'
import { IPrintProps } from '../types'
import classNames from 'classnames'
import '../style.scss'

const Print = ({ value, isShow = true, fixed = false }: IPrintProps) => {
  const isDev = process.env.NODE_ENV === 'development' && isShow
  return isDev ? (
    <div className={classNames('console', { fixed })}>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  ) : (
    <></>
  )
}

export default Print
