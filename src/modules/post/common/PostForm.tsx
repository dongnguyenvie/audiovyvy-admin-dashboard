/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, Row } from 'reactstrap'
// import useDebounce from '../../../../hook/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import TitleFormik from './TitleInput'
import query from '../../../graphql/query'
import Print from '../../print/components'
import TextEditor from '../../common/editor'
import { postKeys } from '../types'
import ActionForm from './ActionForm'

interface IPostForm {
  data?: any
  onChange?: any
}

const PostForm = forwardRef((props: IPostForm & any, ref: any) => {
  const { t } = useTranslation()
  const { data, onChange } = props
  // const editor: any = useState(null)

  const options = {}
  const handleChange = (key: any, value: any) => {
    onChange(key, value)
  }

  const handleSubmit = (options: any) => {
    props.onSubmit(options)
  }

  return (
    <div>
      <TitleFormik initTitle={data?.title} onChange={handleChange} />
      <Row>
        <Col xs="10">
          <TextEditor
            ref={ref}
            value={data?.content}
            options={options}
            // tabIndex={1} // tabIndex of textarea
            onBlur={(newContent: any) => handleChange(postKeys.CONTENT, newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent: any) => {
              //   handleChange(newContent)
            }}
          />
        </Col>
        <Col xs="2">
          <ActionForm onSubmit={handleSubmit} />
        </Col>
      </Row>

      <Print value={data} />
    </div>
  )
})
export default PostForm
