import handsontable from 'handsontable'

interface GridSettings extends handsontable.GridSettings {
    stretchH?: any
}
interface IHandsontableEx {
  (container: Element, options: GridSettings): handsontable
}

const handsontableEx: IHandsontableEx = (container, options) => {
  const _options = {
    licenseKey: 'non-commercial-and-evaluation',
    ...options
  }
  return new handsontable(container, _options)
}

export default handsontableEx
