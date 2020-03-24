import React, { Component } from 'react'
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { IPage404 } from '../types'
import { useTranslation } from 'react-i18next'

const Page404 = (props: IPage404) => {
  const { t } = useTranslation()
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">{t('404')}</h1>
              <h4 className="pt-3">Oops! You're lost.</h4>
              <p className="text-muted float-left">{t('thePageNotFound')}</p>
            </div>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input size={16} type="text" placeholder={t('whatAreULook')} />
              <InputGroupAddon addonType="append">
                <Button color="info">{t('search')}</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Page404
