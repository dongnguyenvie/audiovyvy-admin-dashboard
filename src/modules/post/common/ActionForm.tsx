import React, { useState } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import Print from '../../print/components'

const ActionForm = (props: any) => {
  const [collapse, setCollapse] = useState(true)
  const [status, setStatus] = useState('pending')
  const [format, setFormat] = useState('video')
  const { t } = useTranslation()
  const onEntering = () => {
    setStatus('setStatus')
  }
  const handleSubmit = (e: any) => {
    props.onSubmit()
  }

  const toggleCollapse = (e: any) => {
    e.preventDefault()
    setCollapse(!collapse)
  }
  const handleChangeOptionFormat = (e: any) => {
    setFormat(e.target.value)
  }
  const listFormats = ['normal', 'video', 'audio']
  const formatPosts = () =>
    listFormats.map((value: any, index: number) => {
      return (
        <FormGroup check className="radio" key={index}>
          <Input className="form-check-input" type="radio" id={`radio-${index}`} name="radios" value={value} onChange={handleChangeOptionFormat} />
          <Label check className="form-check-label" htmlFor={`radio-${index}`}>
            {value}
          </Label>
        </FormGroup>
      )
    })
  return (
    <>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i>
          <strong>{t('action')}</strong>
          <div className="card-header-actions">
            <a href="#" rel="noreferrer noopener" className="card-header-action" onClick={toggleCollapse}>
              <i className="fa fa-arrow-up fa-lg"></i>
            </a>
          </div>
        </CardHeader>
        <Collapse isOpen={collapse} onEntering={onEntering} onEntered={onEntering} onExiting={onEntering} onExited={onEntering}>
          <CardBody>
            <p>
              <b>{t('status')}: </b> done
            </p>
            <p>
              <b>{t('show')}: </b> public
            </p>
            <p>
              <b>{t('show')}: </b> {new Date().toDateString()}
            </p>
          </CardBody>
        </Collapse>
        <CardFooter className="d-flex justify-content-end">
          <Button color="primary" onClick={(e: any) => handleSubmit(e)} className={'mb-1'} id="toggleCollapse1">
            {t('update')}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i>
          <strong>{t('format')}</strong>
          <div className="card-header-actions">
            <a href="#" rel="noreferrer noopener" className="card-header-action" onClick={toggleCollapse}>
              <i className="fa fa-arrow-up fa-lg"></i>
            </a>
          </div>
        </CardHeader>
        <Collapse isOpen={collapse} onEntering={onEntering} onEntered={onEntering} onExiting={onEntering} onExited={onEntering}>
          <CardBody>
            <FormGroup row>
              <Col md="9">{formatPosts()}</Col>
            </FormGroup>
          </CardBody>
        </Collapse>
      </Card>
      <Print value={format} />
    </>
  )
}

export default ActionForm
