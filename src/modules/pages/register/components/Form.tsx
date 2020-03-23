import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { IRegisterFormProps, IResigerFormValues } from '../types'

const LoginForm = (props: FormikProps<IResigerFormValues>) => {
  const { t } = useTranslation()
  const { handleSubmit, handleChange, handleBlur, values, errors } = props
  return (
    <Form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <h1>{t('register')}</h1>
      <p className="text-muted">{t('createYourAccount')}</p>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="username" onChange={handleChange} onBlur={handleBlur} placeholder={t('username')} value={values.username} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="email" onChange={handleChange} onBlur={handleBlur} placeholder={t('email')} value={values.email} autoComplete="email" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} placeholder={t('password')} value={values.password} autoComplete="new-password" />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} placeholder={t('confirmPassword')} value={values.confirmPassword} autoComplete="new-password" />
      </InputGroup>
      <Button color="success" type="submit" block onClick={handleSubmit}>
        {t('createAccount')}
      </Button>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
  password: Yup.string()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirmPassword: Yup.string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      // console.error(`this`, this)
      return this.parent.password === value
    })
})

const RegisterFromik = withFormik<IRegisterFormProps, IResigerFormValues>({
  mapPropsToValues: (props) => ({
    username: props.username || '',
    email: props.email || '',
    fullName: props.fullName || '',
    avatar: props.avatar || '',
    password: props.password || '',
    phone: props.phone || '',
    roles: props.roles || [''],
    confirmPassword: ''
  }),
  validationSchema,
  handleSubmit({ username, email, fullName, avatar, password, phone, roles }, { props, setSubmitting, setErrors, setValues }) {
    props.onCreateUser &&
      props.onCreateUser({
        username,
        email,
        fullName,
        avatar,
        password,
        phone,
        roles
      })
  }
})(LoginForm)

export default RegisterFromik
