import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap'
import { LoginType } from '../../../types/login'
import LoginForm from './Form'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { toast } from 'react-toastify'

const QUERY_LOGIN = gql`
  query login($username: String!, $password: String!, $rememberMe: Boolean!) {
    login(user: { username: $username, password: $password, rememberMe: $rememberMe }) {
      success
      token
      user {
        id
        username
        roles {
          id
          permission
          description
          name
        }
      }
    }
  }
`

const LoginPage = (props: LoginType) => {
  console.error(`111props`, props.uuid)
  const [handleLogin, { called, loading, data, error, client, networkStatus, fetchMore }] = useLazyQuery(QUERY_LOGIN)
  if (error) {
    toast.error(error?.graphQLErrors[0]?.message, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  if (!loading && data) {
    toast.success('Login success', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <LoginForm onLogin={handleLogin} message={''} />
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

{
  /* <Route exact path="/handsontable" render={(props) => <HandsontablePage {...props} />} />
<Route<RouteProps & { name: String }> exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
<Route<RoutePropsEx> exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
<Route<RoutePropsEx> exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
<Route<RoutePropsEx> exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
<Route<RoutePropsEx> path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */
}
