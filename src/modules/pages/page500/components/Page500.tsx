import React, { Component } from 'react'
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { IPage500 } from '../types'
import { useTranslation } from 'react-i18next'

const Page500 = (props: IPage500) => {
  const { t } = useTranslation()
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-muted float-left">{t('thePageNotFound')}</p>
            </span>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input size={16} type="text" placeholder={t('whatAreULook')} />
              <InputGroupAddon addonType="append">
                <Button color="info">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Page500
