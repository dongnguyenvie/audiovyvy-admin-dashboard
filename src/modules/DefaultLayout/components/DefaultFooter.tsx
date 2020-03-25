import React from 'react'
import { IDefaultFooterProps } from '../type'
// import { useTranslation } from 'react-i18next'

const defaultProps = {}
const DefaultFooter = ({ children, ...attributes }: IDefaultFooterProps = defaultProps) => {
  // const { t } = useTranslation()
  return (
    <React.Fragment>
      <span>
        <a href="https://audiovyvy.com">Audiovyvy.com</a> &copy; 2020 creativeLabs.
      </span>
      <span className="ml-auto">
        Powered by <a href="http://facebook.com/trangQuynhOfficial">Trạng Quỷnh</a>
      </span>
    </React.Fragment>
  )
}

export default DefaultFooter
