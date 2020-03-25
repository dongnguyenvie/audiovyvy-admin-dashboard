export interface ITextEditor {
  value: string
  options?: object | undefined
  onChange?: (newValue: string) => void
  onBlur?: (newValue: string) => void
  tabIndex?: number
  name?: string
}
