import Handsontable from 'handsontable'
import _ from 'lodash'
import { IHandsontableEx, IChangeEx } from './types'

const HandsontableEx: IHandsontableEx = (container, options = {}) => {
  const _options = {
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'last',
    currentColClassName: 'currentColumn',
    currentRowClassName: 'currentRow',
    // invalidCellClassName: 'highlight--error',
    readOnly: true,
    ...options
  }
  // Custom afterChange hook
  _options.afterChange = (changes, source) => {
    let _changes: IChangeEx[] = []
    _.forEach(changes, ([row, prop, oldValue, newValue]) => {
      const _oldValue = oldValue || null
      const _newValue = newValue || null
      if (_oldValue === _newValue) {
        _changes.push({ row, prop, oldValue, newValue })
      }
    })
    // Run afterChange default
    options.afterChange && options.afterChange(changes, source)
    // Run afterChangeEx hook
    _options.afterChangeEx && !_.isEmpty(_changes) && _options.afterChangeEx(_changes, changes, source)
  }

  return new Handsontable(container, _options)
}

export default HandsontableEx
interface _IHandsontable extends Handsontable {}
export type IHandsontable = _IHandsontable | null