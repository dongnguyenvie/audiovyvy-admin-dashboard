import React from 'react'
import { IDefaultFooterProps } from '../type'

const defaultProps = {}
const DefaultFooter = ({ children, ...attributes }: IDefaultFooterProps = defaultProps) => {
  return (
    <React.Fragment>
      <span>
        <a href="https://coreui.io">CoreUI</a> &copy; 2019 creativeLabs.
      </span>
      <span className="ml-auto">
        Powered by <a href="https://coreui.io/react">CoreUI for React</a>
      </span>
    </React.Fragment>
  )
}

export default DefaultFooter
