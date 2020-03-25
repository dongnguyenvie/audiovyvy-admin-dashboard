import Handsontable from 'handsontable'

export interface GridSettings extends Handsontable.GridSettings {
  stretchH?: any
  afterChangeEx?: (objChanges: IObjChanges[], changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource) => void
  afterSelectionEx?: (row: number, prop: string, row2: number, prop2: string, preventScrolling: { value: boolean }, selectionLayerLevel: number) => void
}
export interface IHandsontableEx {
  (container: any, options?: GridSettings): Handsontable
}
export interface IObjChanges {
  row: number
  prop: string | number
  oldValue: any
  newValue: any
}
