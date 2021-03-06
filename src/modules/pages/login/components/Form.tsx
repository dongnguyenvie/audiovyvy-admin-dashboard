import React, { useState, Mixin } from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap'
import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ILoginFormValues, ILoginFormProps, OtherProps } from '../types'
import { loginActions } from '../types'
import PrintRawText from '../../../print/components/index'

const LoginForm = (props: OtherProps & FormikProps<ILoginFormValues>) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props
  const { t } = useTranslation()
  return (
    <Form>
      <h1>{t(`login`)}</h1>
      <PrintRawText value={values} />
      <p className="text-muted">{t(`signInToYourAccount`)}</p>
      {errors.username && touched.username && <Label>{errors.username}</Label>}
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="username" onChange={handleChange} onBlur={handleBlur} placeholder={t('username')} value={values.username} />
      </InputGroup>
      {errors.password && touched.password && <Label>{errors.password}</Label>}
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} placeholder={t('password')} value={values.password} />
      </InputGroup>
      <InputGroup className="custom-dong justify-content-end">
        <FormGroup check inline>
          <Label className="form-check-label" check htmlFor="remember-cb">
            {t(`rememberMe`)}
          </Label>
          <Input className="form-check-input" type="checkbox" id="remember-cb" name="rememberMe" checked={values.rememberMe} onChange={handleChange} />
        </FormGroup>
      </InputGroup>
      <Label>{values.message}</Label>
      <Row>
        <Col xs="6">
          <Button color="primary" className="px-4" onClick={handleSubmit} disabled={isSubmitting || !!(errors.username || errors.password)} type="submit">
            {t(`login`)}
          </Button>
        </Col>
        <Col xs="6" className="text-right">
          <Button color="link" className="px-0">
            {t(`forgotPassword`)}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const LoginFormik = withFormik<ILoginFormProps, ILoginFormValues>({
  mapPropsToValues: (props) => ({
    username: props.initialUsername || '',
    password: props.initialPassword || '',
    message: props.message,
    rememberMe: !!props.initialRememberMe
  }),

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  }),

  handleSubmit({ username, password, rememberMe }, { props, setSubmitting, setErrors, setValues }) {
    props
      .onLogin({
        variables: {
          username,
          password,
          rememberMe
        }
      })
      .then((data: any) => {
        props.onCallback(loginActions.SUCCESS, data.data, rememberMe)
      })
      .catch((err: any) => {
        props.onCallback(loginActions.FAIL)
      })
    setSubmitting(false)
  }
})(LoginForm)

export default LoginFormik
