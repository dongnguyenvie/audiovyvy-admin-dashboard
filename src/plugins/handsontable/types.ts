import Handsontable from 'handsontable'

export interface GridSettings extends Handsontable.GridSettings {
  stretchH?: any
  afterChangeEx?: Function
}
export interface IHandsontableEx {
  (container: any, options?: GridSettings): Handsontable
}
export interface IChangeEx {
  row: number
  prop: string | number
  oldValue: any
  newValue: any
}
