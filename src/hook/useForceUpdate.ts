import { useState } from 'react'

export default function useForceUpdate(): [number, Function] {
  const [value, setValue] = useState(0) // integer state
  return [value, () => setValue((value) => ++value)] // update the state to force render
}
