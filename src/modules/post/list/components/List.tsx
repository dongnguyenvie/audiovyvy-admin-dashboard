import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap'
import Handsontable, { IHandsontableEx } from '../../../../plugins/handsontable'
import { useQuery } from '@apollo/react-hooks'
import PrintTextRaw from '../../../print/components/index'
import _ from 'lodash'
import { imageRenderer } from '../../../../plugins/handsontable/renderers/ImageRender'
import classNames from 'classnames'
import query from '../../../../graphql/query'
import { useRouterEx } from '../../../../hook/useRouterEx'

const ListOfPosts = (props: any) => {
  const containerEl = useRef(null)
  const [hot, setHot] = useState<IHandsontableEx.Core>(null)
  const [selected, setSelected] = useState('')
  const [isEdit, setEditMode] = useState(false)
  const routerEx = useRouterEx()

  const { fetchMore, data, loading } = useQuery(query.GET_POSTS, {
    variables: {
      filters: {
        page: 1,
        limit: 20,
        populate: 'user'
      }
    }
  })

  const settings: IHandsontableEx.GridSettings = useMemo(() => {
    let _settings: IHandsontableEx.GridSettings = {}
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
    const _hot = Handsontable(containerEl.current)
    setHot(_hot)
    return () => {
      hot && hot.destroy()
    }
  }, [])

  useEffect(() => {
    if (!hot) {
      return
    }
    const colHeaders = ['id', 'title', 'content', 'username', 'avatar']
    const _settings: IHandsontableEx.GridSettings = {
      colHeaders,
      stretchH: 'all',
      hiddenColumns: {
        columns: [0]
      },
      afterChange: (changes) => {
        console.log(`change`, changes)
      },
      afterChangeEx: (_changes) => {},
      afterSelectionByProp: (row, prop) => {
        const id = hot.getDataAtRowProp(row, 'id')
        setSelected(id)
      },
      ...settings
    }
    hot.updateSettings(_settings)
  }, [hot])

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

  const handleEdit = () => {
    if (!selected) {
      return
    }
    routerEx.push({
      path: '/post/edit/:id',
      params: {
        id: selected
      }
    })
  }

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
                  <Button color="primary" size="sm" className="p-2" onClick={handleEdit} disabled={!selected}>
                    <i className="fa fa-edit fa-lg"></i>edit
                  </Button>
                </div>
              </Row>
              <div className={classNames('handsontable-wrapper mt-3', { 'edit-mode': isEdit })}>
                <div ref={containerEl} className="js-handsontable"></div>
              </div>
              {selected}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <PrintTextRaw value={data} />
    </div>
  )
}

export default ListOfPosts
