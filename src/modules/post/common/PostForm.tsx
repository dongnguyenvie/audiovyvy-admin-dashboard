/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState, forwardRef, useMemo } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, Row } from 'reactstrap'
// import useDebounce from '../../../../hook/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import TitleFormik from './TitleInput'
import query from '../../../graphql/query'
import Print from '../../print/components'
import TextEditor from '../../common/editor'
import ActionForm from './ActionForm'
import { v4 as uuidv4 } from 'uuid'
import { IPostForm, postKeys } from '../types'

const PostForm = forwardRef((props: IPostForm, ref: any) => {
  const { data, onChange, onSubmit, onBur, forceUpdateCount = 0 } = props

  const options = {}
  const handleChange = (key: string, value: string) => {
    onChange && onChange(key, value)
  }

  const handleBur = (key: string, value: string) => {
    onBur && onBur(key, value)
  }

  const handleSubmit = (options: any) => {
    onSubmit && onSubmit(options)
  }
  const memoTextEditor = useMemo(
    () => (
      <TextEditor
        ref={ref}
        value={data?.content}
        options={options}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent: any) => {
          handleBur(postKeys.CONTENT, newContent)
        }} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent: any) => {
          handleChange(postKeys.CONTENT, newContent)
        }}
      />
    ),
    [forceUpdateCount]
  )
  return (
    <>
      <TitleFormik initTitle={data?.title} onChange={handleChange} />
      <Row>
        <Col xs="10">{memoTextEditor}</Col>
        <Col xs="2">
          <ActionForm onSubmit={handleSubmit} />
        </Col>
      </Row>
    </>
  )
})
export default PostForm
