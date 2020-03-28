export function removeRow(instance: any, index: Number | Number[], amount?: number, source?: string, keepEmptyRows?: boolean) {
  return instance.alter('remove_row', index)
}
