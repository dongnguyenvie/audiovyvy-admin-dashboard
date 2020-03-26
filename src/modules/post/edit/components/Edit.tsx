/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState } from 'react'
import TextEditor from '../../../common/editor/'
import Print from '../../../print/components/index'
// import useDebounce from '../../../../hook/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../../graphql/query'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import PostForm from '../../common/PostForm'
import { postKeys } from '../../types'

const EditPost = (props: any) => {
  const { t } = useTranslation()
  const editor: any = useState(null)
  const { data, loading, error } = useQuery(query.GET_POST_BY_ID, {
    variables: {
      post: {
        id: props.match.params.id
      }
    }
  })
  const [dataPost, setPostData] = useState('') as any

  const handleChange = (key: any, value: any) => {
    let _data = _.cloneDeep(dataPost)
    if (key === postKeys.TITLE) {
      _data.title = value
    }
    if (key === postKeys.CONTENT) {
      _data.content = value
    }
    setPostData(_data)
  }

  useEffect(() => {
    if (!loading && data) {
      const _data = _.get(data, 'getPost.result')
      setPostData(_data)
    }
  }, [data])

  window.dongdong = editor
  return <PostForm data={dataPost} onChange={handleChange} />
}
export default EditPost
