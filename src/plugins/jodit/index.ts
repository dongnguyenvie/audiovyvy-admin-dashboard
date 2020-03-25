import { Jodit, IJodit as _IJodit } from 'jodit'
import { IJoditEx } from './types'

// {@see https://xdsoft.net/jodit/doc/methods/}
const JoditEx: IJoditEx = (selector, options) => {
  const _options = {
    // uploader: {
    //   url: 'http://localhost:8181/index-test.php?action=fileUpload'
    // },
    minHeight: 650, //min-height: 30%
    ...options
  }
  return new Jodit(selector, _options)
}

export default JoditEx
export type IJodit = _IJodit