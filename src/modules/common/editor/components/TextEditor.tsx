import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from 'react'
import Jodit, { IJodit } from '../../../../plugins/jodit'
import { ITextEditor } from '../type'
import Print from '../../../print/components/'

// {@see https://github.com/jodit/jodit-react}
const TextEditor = forwardRef(({ value, options, onChange, onBlur, tabIndex, name = '' }: ITextEditor, ref: any) => {
  const textArea: any = useRef(null)
  useEffect(() => {
    if (!ref) {
      return
    }
    // expect that if a ref has been given to this component, it is either a function or an object created by React.createRef();
    typeof ref === 'function' ? ref(textArea.current) : (ref.current = textArea.current)

    //  clean up (hint: 99.999% of the time the only time the clean up function will be called is when this component unmounts)
    // return () => (typeof ref === 'function' ? ref(null) : (ref.current = null))
    // this is to satisfy the exhaustive dependency eslint rule of hooks. In practice, it's **likely** this hook will only ever get fired twice - when the component mounts and when it unmounts as the `ref` and someInternalRef will (again, **likely**) never change.
  }, [textArea, ref])

  useEffect(() => {
    const blurHandler = (value: string) => {
      onBlur && onBlur(value)
    }

    const changeHandler = (value: string) => {
      onChange && onChange(value)
    }

    const element = textArea.current
    textArea.current = Jodit(element, options)

    textArea.current.value = value
    textArea.current.events.on('blur', () => blurHandler(textArea.current.value))
    textArea.current.events.on('change', () => changeHandler(textArea.current.value))
    textArea.current.workplace.tabIndex = tabIndex || -1

    return () => {
      textArea.current.destruct()
      textArea.current = element
    }
  }, [options])

  useEffect(() => {
    if (textArea && textArea.current) {
      textArea.current.value = value
    }
  }, [textArea, value])

  return (
    <>
      <textarea ref={textArea} name={name} />
    </>
  )
})

export default TextEditor
