import React, { useEffect, useState, useRef } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import Handsontable, { IHandsontableEx } from '../../../plugins/handsontable'

const ListOfPosts = (props: any) => {
  const containerEl = useRef(null)
  const [hot, setHot] = useState<IHandsontableEx.Core>(null)
  useEffect(() => {
    const columns = [{ data: 'id', type: 'text' }, { data: 'name' }, { data: 'isActive', type: 'checkbox' }, { data: 'date', type: 'date', dateFormat: 'YYYY-MM-DD' }, { data: 'color', type: 'autocomplete', source: ['yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white'] }]
    const data = [
      { id: 1, name: 'Ted', isActive: true, color: 'orange', date: '2015-01-01' },
      { id: 2, name: 'John', isActive: false, color: 'black', date: null },
      { id: 3, name: 'Al', isActive: true, color: 'red', date: null },
      { id: 4, name: 'Ben', isActive: false, color: 'blue', date: null }
    ]
    const colHeaders = ['ID', 'Country', 'Code', 'Currency', 'Level', 'Units', 'Date', 'Change']
    const _hot = Handsontable(containerEl.current, { data, columns, colHeaders })
    setHot(_hot)
    return () => {
      hot && hot.destroy()
    }
  }, [])
  window.dongdong = hot

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>
              <strong>Breadcrumbs</strong>
              <div className="card-header-actions">
                <a href="https://reactstrap.github.io/components/breadcrumbs/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="handsontable-wrapper edit-mode">
                <div ref={containerEl} className="js-handsontable"></div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ListOfPosts
