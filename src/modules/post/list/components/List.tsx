import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap'
import Handsontable, { IHandsontableEx } from '../../../../plugins/handsontable'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PrintTextRaw from '../../../print/components/index'
import _ from 'lodash'
import { imageRenderer } from '../../../../plugins/handsontable/renderers/ImageRender'
import classNames from 'classnames'
import query from '../../../../graphql/query'

const ListOfPosts = (props: any) => {
  const containerEl = useRef(null)
  const [hot, setHot] = useState<IHandsontableEx.Core>(null)
  const [selected, setSelected] = useState(null)
  const [isEdit, setEditMode] = useState(false)
  const { fetchMore, data, loading } = useQuery(query.POSTS, {
    variables: {
      filters: {
        page: 1,
        limit: 10,
        populate: 'user'
      }
    }
  })

  const settings: any = useMemo(() => {
    let _settings: any = {}
    let _data: any = []
    const _posts = _.get(data, 'getPosts.docs')
    const _columns = [
      { data: 'id', type: 'text' },
      { data: 'title', type: 'text' },
      { data: 'content', type: 'text' },
      { data: 'username', type: 'text' },
      { data: 'avatar', renderer: imageRenderer }
    ]
    if (data) {
      _posts.forEach((post: any) => {
        const _post: any = {}
        _post.id = post.id
        _post.title = post.title
        _post.content = post.content
        _post.username = post.user.username
        _post.avatar = post.user.avatar
        _data.push(_post)
      })
      _settings.data = _data
    }
    _settings.columns = _columns
    return _settings
  }, [data])

  useEffect(() => {
    const colHeaders = ['id', 'title', 'content', 'username', 'avatar']
    const _settings: IHandsontableEx.GridSettings = {
      colHeaders,
      stretchH: 'all',
      hiddenColumns: {
        columns: [0]
      },
      afterChange: (changes) => {},
      afterChangeEx(_changes) {},
      afterSelectionEx: (row, prop) => {
        // console.log(`prop`, prop)
      },
      afterSelectionByProp: (row, prop) => {},
      ...settings
    }
    const _hot = Handsontable(containerEl.current, _settings)
    setHot(_hot)
    return () => {
      hot && hot.destroy()
    }
  }, [])

  useEffect(() => {
    if (hot && !loading && data) {
      hot.updateSettings({
        ...settings,
        readOnly: !isEdit
      })
    }
  }, [settings])

  useEffect(() => {
    hot &&
      hot.updateSettings({
        readOnly: !isEdit
      })
  }, [isEdit])

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
              <Row className="justify-content-end">
                <div className="pr-3">
                  <Button color="primary" size="sm" className="p-2 mr-2" onClick={() => setEditMode(!isEdit)}>
                    Change mode
                  </Button>
                  <Button color="primary" size="sm" className="p-2">
                    <i className="fa fa-edit fa-lg"></i>edit
                  </Button>
                </div>
              </Row>

              {/* <span className="text-muted">(alias)</span> */}
              <div className={classNames('handsontable-wrapper mt-3', { 'edit-mode': isEdit })}>
                <div ref={containerEl} className="js-handsontable"></div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <PrintTextRaw value={data} />
    </div>
  )
}

export default ListOfPosts
