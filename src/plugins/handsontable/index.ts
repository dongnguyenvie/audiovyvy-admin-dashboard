import handsontable from 'handsontable'

interface GridSettings extends handsontable.GridSettings {
  stretchH?: any
}
interface IHandsontableEx {
  (container: any, options?: GridSettings): handsontable
}

const handsontableEx: IHandsontableEx = (container, options = {}) => {
  const _options = {
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'last',
    colWidths: 100,
    columnHeaderHeight: 46,
    ...options
  }
  return new handsontable(container, _options)
}

export default handsontableEx
interface _IHandsontable extends handsontable {}
export type IHandsontable = _IHandsontable | null
