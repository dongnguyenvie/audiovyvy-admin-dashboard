import React, { useState, Mixin } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap'
import { LoginType } from '../../../types/login'
import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'

interface FormValues {
  username: string
  password: string
  message?: String
}
interface OtherProps {}
interface LoginFormProps {
  initialUsername?: string
  initialPassword?: string
  onLogin: Function
  message?: String
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props

  return (
    <Form>
      <h1>Login</h1>
      <p className="text-muted">Sign In to your account</p>
      {errors.username && touched.username && <Label>{errors.username}</Label>}
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="username" onChange={handleChange} onBlur={handleBlur} placeholder="Username" value={values.username} />
      </InputGroup>
      {errors.password && touched.password && <Label>{errors.password}</Label>}
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} placeholder="Password" value={values.password} />
      </InputGroup>
      <Label>{values.message}</Label>
      <Row>
        <Col xs="6">
          <Button color="primary" className="px-4" onClick={handleSubmit} disabled={isSubmitting || !!(errors.username || errors.password)} type="submit">
            Login
          </Button>
        </Col>
        <Col xs="6" className="text-right">
          <Button color="link" className="px-0">
            Forgot password?
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const LoginForm = withFormik<LoginFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    username: props.initialUsername || '',
    password: props.initialPassword || '',
    message: props.message
  }),

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  }),

  handleSubmit({ username, password }: any, { props, setSubmitting, setErrors, setValues }) {
    props.onLogin({
      variables: {
        username,
        password,
        rememberMe: false
      },
      onCompleted: (data: any) => {
        console.error(`onCompleted`, data)
      }
    })
    setSubmitting(false)
  },

  mapValuesToPayload(payload) {
    console.error(1111, payload)
    return payload
  }
})(InnerForm)

export default LoginForm
