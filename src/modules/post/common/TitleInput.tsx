/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, Row } from 'reactstrap'
import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import Print from '../../print/components'
import { postKeys, ITitleFormValues, IOtherFormValues, ITitleFormProps } from '../types'
import { stringToSlug } from '../../common/methods/stringToSlug'

const TitleForm = (props: FormikProps<ITitleFormValues> & IOtherFormValues) => {
  const { handleChange, values, onChange, handleBlur } = props
  const { t } = useTranslation()
  const _handleChange = (e: any) => {
    onChange(postKeys.TITLE, e.target.value)
  }
  return (
    <Row>
      <Col xs="12">
        <Print value={values.titleValue} />
        <FormGroup>
          <Label htmlFor="name">{t('editPost')}</Label>
          <Input className="mb-2" name="titleValue" type="text" placeholder={t('enterTitle')} value={values.titleValue} onChange={handleChange} onBlur={_handleChange} />
          <b className="ml-1">{t('url')}: </b>
          <a href="/" onClick={() => {}}>
            {stringToSlug(values.titleValue)}
          </a>
        </FormGroup>
      </Col>
    </Row>
  )
}

const TitleFormik = withFormik<ITitleFormProps, ITitleFormValues>({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    titleValue: props.initTitle || ''
  }),
  validationSchema: Yup.object().shape({
    titleValue: Yup.string()
  }),
  handleSubmit({}, { props, setSubmitting, setErrors, setValues }) {}
})(TitleForm)

export default TitleFormik
