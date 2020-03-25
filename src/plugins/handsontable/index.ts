import Handsontable from 'handsontable'
import _ from 'lodash'
import { IHandsontableEx, IObjChanges, GridSettings as _GridSettings } from './types'

const HandsontableEx: IHandsontableEx = (container, options = {}) => {
  const _options = {
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'last', // 'none' | 'all' | 'last';
    selectionMode: 'single', //'single' | 'range' | 'multiple';
    // preventOverflow?: boolean | 'vertical' | 'horizontal';
    // disableVisualSelection?: boolean | 'current' | 'area' | 'header' | ('current' | 'area' | 'header')[];
    // fillHandle?: boolean | 'vertical' | 'horizontal' | autoFill.Settings;
    currentColClassName: 'currentColumn',
    currentRowClassName: 'currentRow',
    // invalidCellClassName: 'highlight--error',
    readOnly: true,
    colWidths: 100, // refs https://handsontable.com/docs/7.1.1/Options.html#colWidths
    ...options
  }
  // Custom afterChange hook
  _options.afterChange = (changes, source) => {
    let _changes: IObjChanges[] = []
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

  _options.afterSelection = function(this: Handsontable, row, column, row2, column2, preventScrolling, selectionLayerLevel) {
    // Run hook default
    options.afterSelection && options.afterSelection(row, column, row2, column2, preventScrolling, selectionLayerLevel)
    // Run afterSelectionEx hook
    if (_options.afterSelectionEx) {
      const prop = this.colToProp(column) as string
      const prop2 = this.colToProp(column2) as string
      // {@see https://handsontable.com/docs/7.4.2/Hooks.html#event:afterSelectionByProp}
      _options.afterSelectionEx(row, prop, row2, prop2, preventScrolling, selectionLayerLevel)
    }
  }

  return new Handsontable(container, _options)
}

export default HandsontableEx

interface _IHandsontable extends Handsontable {}
export declare namespace IHandsontableEx {
  type GridSettings = _GridSettings
  type Core = _IHandsontable | null
}
