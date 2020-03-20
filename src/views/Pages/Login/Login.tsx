import React, { useState, Mixin } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap'
import { LoginType } from '../../../types/login'
// import { Formik, FormikHelpers, FormikProps, Field, FieldProps, FormikErrors } from 'formik'

import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'

interface FormValues {
  username: string
  password: string
}

interface OtherProps {}

interface LoginFormProps {
  initialUsername?: string
  initialPassword?: string
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
      <Row>
        <Col xs="6">
          <Button color="primary" className="px-4" onClick={handleSubmit} disabled={isSubmitting || !!(errors.username || errors.password)}>
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
    password: props.initialPassword || ''
  }),

  validationSchema: Yup.object().shape({
    username: Yup.string().email('Email not valid'),
    password: Yup.string().required('Password is required')
  }),

  handleSubmit({ username, password }: FormValues, { props, setSubmitting, setErrors }) {
    console.error(username, password)
  }
})(InnerForm)

const LoginPage = (props: LoginType) => {
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <LoginForm />
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage
