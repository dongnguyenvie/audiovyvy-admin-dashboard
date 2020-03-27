import { Jodit, IJodit as _IJodit } from 'jodit'
import { IJoditEx } from './types'

// {@see https://xdsoft.net/jodit/doc/methods/}
const JoditEx: IJoditEx = (selector, options) => {
  const _options = {
    // uploader: {
    //   url: 'http://localhost:8181/index-test.php?action=fileUpload'
    // },
    // buttons: ['bold', 'italic', 'underline', 'strikethrough', '|', 'ul', 'ol', '|', 'center', 'left', 'right', 'justify', '|', 'link', 'image'],
    // uploader: { insertImageAsBase64URI: true },
    // removeButtons: ['brush', 'file'],
    // showXPathInStatusbar: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // toolbarAdaptive: false,
    // autofocus: true,
    minHeight: 650, //min-height: 30%
    ...options
  }
  return Jodit.make(selector, _options)
}

export default JoditEx
export type IJodit = _IJodit
