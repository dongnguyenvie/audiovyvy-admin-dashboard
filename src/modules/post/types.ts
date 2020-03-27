export enum postKeys {
  TITLE = 'title',
  CONTENT = 'content'
}

export interface IPostForm {
  data?: any
  onChange?: any
  onBur?: any
}
export interface ITitleFormProps {
  initTitle?: string
  onChange?: Function
}
export interface ITitleFormValues {
  titleValue?: string
  onChange?: Function
}
export interface IOtherFormValues {
  onChange?: any
}
export interface IActionForm {
  onSubmit?: Function
}
