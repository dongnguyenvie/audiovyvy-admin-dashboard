/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import TextEditor from '../../../common/editor/'
import Print from '../../../print/components/index'
// import useDebounce from '../../../../hook/useDebounce'
import { useQuery, useMutation } from '@apollo/react-hooks'
import query from '../../../../graphql/query'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import PostForm from '../../common/PostForm'
import { postKeys } from '../../types'
import mutation from '../../../../graphql/mutation'
import { toast } from 'react-toastify'
import { ICreatePost } from '../types'

const Create = (props: ICreatePost) => {
  const { user, uuid } = props
  const { t } = useTranslation()
  const editor: any = useRef(null)
  const [handleCreatePost, { data, loading }] = useMutation(mutation.CREATE_POST)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleChange = useCallback((key: string, value: string) => {
    if (key === postKeys.TITLE) {
      setTitle(value)
    }
    if (key === postKeys.CONTENT) {
      setContent(value)
    }
  }, [])

  const dataPost = useMemo(() => {
    return {
      title,
      content
    }
  }, [title, content])

  const handleSubmit = useCallback(
    (options: any = {}) => {
      const _options = {
        ...options,
        variables: {
          post: {
            ...dataPost,
            blog: user.blog
          }
        }
      }
      handleCreatePost(_options)
        .then((_data: any) => {
          toast.success('Create post success', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
        .catch((err: any) => {
          toast.error('Fail', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    },
    [dataPost]
  )

  return (
    <>
      <PostForm key={uuid} ref={editor} data={dataPost} onChange={handleChange} onSubmit={handleSubmit} />
      <Print value={dataPost} />
    </>
  )
}
export default Create
