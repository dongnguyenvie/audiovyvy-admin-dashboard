import React from 'react'
import { IPrintProps } from '../types'
import '../style.scss'

const Print = ({ value, isShow = true }: IPrintProps) => {
  const isDev = process.env.NODE_ENV === 'development' && isShow
  return isDev ? (
    <div className="console">
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  ) : (
    <></>
  )
}

export default Print
