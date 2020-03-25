/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, Row } from 'reactstrap'
import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import Print from '../../../print/components'

interface ITitleFormProps {
  initTitle?: string
}
interface ITitleFormValues {
  titleValue?: string
}

const TitleForm = (props: FormikProps<ITitleFormValues>) => {
  const { handleSubmit, handleChange, handleBlur, values } = props
  const { t } = useTranslation()
  return (
    <Row>
      <Col xs="12">
        <Print value={values.titleValue} />
        <FormGroup>
          <Label htmlFor="name">{t('editPost')}</Label>
          <Input name="titleValue" type="text" placeholder={t('enterTitle')} value={values.titleValue} onChange={handleChange} onBlur={handleBlur} />
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
