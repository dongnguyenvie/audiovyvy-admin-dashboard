import React, { useEffect } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import FormLogin from './Form'
import { IRegisterProps } from '../types'
import gql from 'graphql-tag'
import '../style.scss'

const MUTATION_CREATE_USER = gql`
  mutation createUser($user: InputCreateUser) {
    createUser(user: $user) {
      success
      message
      result {
        id
        username
        fullName
        roles {
          name
          permission
        }
      }
    }
  }
`

const Register = (props: IRegisterProps) => {
  const { t } = useTranslation()
  const [handleCreateUser, { data, loading, error }] = useMutation(MUTATION_CREATE_USER)

  return (
    <div className="app flex-row align-items-center">
      <pre>{!loading && data && JSON.stringify(data, null, 2)}</pre>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <FormLogin onCreateUser={handleCreateUser} />
              </CardBody>
              <CardFooter className="p-4">
                <Row>
                  <Col xs="12" sm="6">
                    <Button className="btn-facebook mb-1" block>
                      <span>{t('facebook')}</span>
                    </Button>
                  </Col>
                  <Col xs="12" sm="6">
                    <Button className="btn-twitter mb-1" block>
                      <span>{t('twitter')}</span>
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
