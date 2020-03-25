import React, { useEffect, useRef, useState } from 'react'
import TextEditor from '../../../common/editor/'
import Print from '../../../print/components/index'
import useDebounce from '../../../../hook/useDebounce'

const Create = (props: any) => {
  const editor: any = useState(null)
  const [content, setContent] = useState('lorem text')

  const options = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const handleChange = (value: any) => {
    setContent(value)
  }

  window.dongdong = editor
  return (
    <div>
      <h1>Test</h1>
      <TextEditor
        ref={editor}
        value={content}
        options={options}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent: any) => handleChange(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent: any) => {
          //   handleChange(newContent)
        }}
      />
      <Print value={content} />
    </div>
  )
}
export default Create
