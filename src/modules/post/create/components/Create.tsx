/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState } from 'react'
import TextEditor from '../../../common/editor/'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, Row } from 'reactstrap'
import Print from '../../../print/components/index'
// import useDebounce from '../../../../hook/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../../graphql/query'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import TitleFormik from './TitleForm'

const Create = (props: any) => {
  const { t } = useTranslation()
  console.error(`props`, props)
  const editor: any = useState(null)
  const { data, loading, error } = useQuery(query.GET_POST_BY_ID, {
    variables: {
      post: {
        id: props.match.params.id
      }
    }
  })
  const [dataSet, setData] = useState('') as any
  const [_title, _setTitle] = useState('') as any
  const options = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const handleChange = (value: any) => {
    setData(value)
  }

  useEffect(() => {
    if (!loading && data) {
      const _data = _.get(data, 'getPost.result')
      console.error(111, data)
      _setTitle(_data.title)
      setData(_data)
    }
  }, [data])

  window.dongdong = editor
  return (
    <div>
      <TitleFormik initTitle={dataSet?.content} />
      <TextEditor
        ref={editor}
        value={dataSet?.content}
        options={options}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent: any) => handleChange(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent: any) => {
          //   handleChange(newContent)
        }}
      />
      <Print value={dataSet} />
    </div>
  )
}
export default Create
