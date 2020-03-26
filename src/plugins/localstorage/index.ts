import { PREFIX } from '../../constants'

const getKey = (key: string) => PREFIX + key
const handleResponse = (fnc: Function) => {
  try {
    return fnc() || true
  } catch (error) {
    return false
  }
}
function set(key: string, value: any) {
  const callback = () => {
    const _key = getKey(key)
    localStorage.setItem(_key, JSON.stringify(value))
  }
  return handleResponse(callback)
}

function get(key: string) {
  const callback = () => {
    const _key = getKey(key)
    const _value = localStorage.getItem(_key)
    if (!_value) {
      throw 'null'
    }
    return JSON.parse(_value)
  }
  return handleResponse(callback)
}

function clear() {
  const callback = () => {
    localStorage.clear()
  }
  return handleResponse(callback)
}

function remove(key: string) {
  const callback = () => {
    const _key = getKey(key)
    localStorage.removeItem(_key)
  }
  return handleResponse(callback)
}
const LocalStorage = {
  set,
  get,
  clear,
  remove
}

export default LocalStorage
