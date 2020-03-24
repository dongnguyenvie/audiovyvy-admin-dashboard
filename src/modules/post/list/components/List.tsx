import React, { useEffect, useState, useRef } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import Handsontable, { IHandsontable } from '../../../../plugins/handsontable'
import { useQuery } from '@apollo/react-hooks'
import qgl from 'graphql-tag'
import PrintTextRaw from '../../../print/components/index'
import _ from 'lodash'
import { coverRenderer } from '../../../../plugins/handsontable/renderers/ImageRender'
import classNames from 'classnames'

const QUERY_POSTS = qgl`
query getPosts($filters: InputPagingRequest) {
    getPosts(filters: $filters) {
      docs {
        title
        content
        metaData
        categories
        user {
          id
          username
          fullName
          avatar
        }
        createdAt
        updatedAt
      }
      prevPage
      nextPage
    }
  }
`

const ListOfPosts = (props: any) => {
  const containerEl = useRef(null)
  const [hot, setHot] = useState<IHandsontable>(null)
  const [isEdit, setEditMode] = useState(false)

  const { fetchMore, data, loading } = useQuery(QUERY_POSTS, {
    variables: {
      filters: {
        page: 1,
        limit: 10,
        populate: 'user'
      }
    }
  })
  useEffect(() => {
    const colHeaders = ['title', 'content', 'username', 'avatar']
    const _settings = {
      colHeaders,
      afterChange: (changes: any) => {
        changes &&
          changes.forEach(([row, prop, oldValue, newValue]: any) => {
            console.error(row, prop)
            // Some logic...
          })
      },
      cells: (row: any, column: any, prop: any) => {
        if (!hot) {
          return {}
        }
        const cellProperties = {}
        const visualRowIndex = hot.toVisualRow(row)
        const visualColIndex = hot.toVisualColumn(column)

        if (visualRowIndex === 0 && visualColIndex === 0) {
          // cellProperties.readOnly = true
        }

        return cellProperties
      }
    }
    const _hot = Handsontable(containerEl.current, _settings)
    setHot(_hot)
    return () => {
      hot && hot.destroy()
    }
  }, [])

  useEffect(() => {
    if (hot && !loading && data) {
      const _posts = _.get(data, 'getPosts.docs')
      let _data: any = []
      _posts.forEach((post: any) => {
        const _post: any = {}
        _post.title = post.title
        _post.content = post.content
        _post.username = post.user.username
        _post.avatar = post.user.avatar
        _data.push(_post)
      })
      console.error(`_data`, _data)
      const columns = [
        { data: 'title', type: 'text' },
        { data: 'content', type: 'text' },
        { data: 'username', type: 'text' },
        { data: 'avatar', renderer: coverRenderer }
      ]
      hot.updateSettings({
        data: _data,
        columns,
        readOnly: !isEdit
      })
      //   hot.set
    }
  }, [data])

  useEffect(() => {
    hot &&
      hot.updateSettings({
        readOnly: !isEdit
      })
  }, [isEdit])
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
              <button onClick={() => setEditMode(!isEdit)}>Change mode</button>
              <div className={classNames('handsontable-wrapper', { 'edit-mode': isEdit })}>
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
