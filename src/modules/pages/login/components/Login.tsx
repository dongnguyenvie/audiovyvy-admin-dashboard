import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap'
import LoginForm from './Form'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { onSetUser } from '../../../../reducers/authentication/Auth.reducer'
import { ILoginProps, loginActions } from '../types'
import _ from 'lodash'
import '../style.scss'
import mutation from '../../../../graphql/mutation'
import { localStorageKeys } from '../../../../constants'
import LocalStorage from '../../../../plugins/localstorage'

const LoginPage = (props: ILoginProps & { onSetUser: typeof onSetUser }) => {
  let history = useHistory()
  const handleCallback = (actions: keyof typeof loginActions, data: any, isRemember: boolean = false) => {
    if (actions === loginActions.SUCCESS) {
      toast.success('Login success', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      const _token = data.login.token
      let _user = {
        ...data.login.user,
        isLogin: true,
        isRemember
      }
      _user.roles = data.login.user.roles.map((role: { id: string }) => role.id)
      // _user.token = _token
      props?.onSetUser(_user)
      if (isRemember) {
        LocalStorage.set(localStorageKeys.AUTH, _user)
      } else {
        LocalStorage.remove(localStorageKeys.AUTH)
      }
      LocalStorage.set(localStorageKeys.TOKEN, _token)

      setTimeout(() => {
        history.push('/')
      }, 100)
    } else {
      toast.error(error?.graphQLErrors[0]?.message || 'error', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  const [handleLogin, { called, loading, data, error }] = useMutation(mutation.LOGIN)

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <LoginForm onLogin={handleLogin} onCallback={handleCallback} message={''} />
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
const mapStateToProps = () => ({})
const mapDispatchToProps = {
  onSetUser: onSetUser
}
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(LoginPage)

{
  /* <Route exact path="/handsontable" render={(props) => <HandsontablePage {...props} />} />
<Route<RouteProps & { name: String }> exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
<Route<RoutePropsEx> exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
<Route<RoutePropsEx> exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
<Route<RoutePropsEx> exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
<Route<RoutePropsEx> path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */
}
