/*eslint no-unused-vars: "off"*/
import React, { useEffect, useRef, useState } from 'react'
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

let initDataPost = {
  content: '',
  title: ''
}

const Create = (props: any) => {
  const { user, uuid } = props
  const { t } = useTranslation()
  const editor: any = useRef(null)
  const [handleCreatePost, { data, loading }] = useMutation(mutation.CREATE_POST)
  const [dataPost, setPostData] = useState(initDataPost) as any
  const handleChange = (key: any, value: any) => {
    if (dataPost[key] === value) {
      return
    }
    let _data = _.cloneDeep(dataPost)
    if (key === postKeys.TITLE) {
      _data.title = value
    }
    if (key === postKeys.CONTENT) {
      _data.content = value
    }
    setPostData(_data)
  }

  const handleSubmit = (options: any) => {
    const _options = {
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
  }

  // useEffect(() => {
  //   if (!loading && data) {
  //     const _data = _.get(data, 'getPost.result')
  //     setPostData(_data)
  //   }
  // }, [data])

  window.dongdong = editor
  return <PostForm ref={editor} data={dataPost} onChange={handleChange} onSubmit={handleSubmit} />
  // return (
  //   <TextEditor value={"aaa"}></TextEditor>
  // )
}
export default Create
