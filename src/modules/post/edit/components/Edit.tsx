/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState, useMemo } from 'react'
import TextEditor from '../../../common/editor/'
import Print from '../../../print/components/index'
// import useDebounce from '../../../../hook/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../../graphql/query'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import PostForm from '../../common/PostForm'
import { postKeys } from '../../types'
import useForceUpdate from '../../../../hook/useForceUpdate'

const EditPost = (props: any) => {
  const { t } = useTranslation()
  const editor: any = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [forceUpdateCount, forceUpdate] = useForceUpdate()
  const { data, loading, error } = useQuery(query.GET_POST_BY_ID, {
    variables: {
      post: {
        id: props.match.params.id
      }
    }
  })
  // const [dataPost, setPostData] = useState('') as any

  const dataPost = useMemo(
    () => ({
      title,
      content
    }),
    [title, content]
  )

  const handleChange = (key: any, value: any) => {
    if (key === postKeys.TITLE) {
      setTitle(value)
    }
    if (key === postKeys.CONTENT) {
      setContent(value)
    }
  }

  useEffect(() => {
    if (!loading && data) {
      const _data = _.get(data, 'getPost.result')
      setTitle(_data.title)
      setContent(_data.content)
      forceUpdate()
    }
  }, [data])

  window.dongdong = editor
  return (
    <>
      <PostForm data={dataPost} onChange={handleChange} forceUpdateCount={forceUpdateCount} />
      <Print value={dataPost}></Print>
    </>
  )
}
export default EditPost
