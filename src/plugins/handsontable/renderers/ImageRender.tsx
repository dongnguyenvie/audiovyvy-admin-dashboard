import Handsontable from 'handsontable'

export const imageRenderer: typeof Handsontable.renderers.TextRenderer = function(this: typeof Handsontable, instance, td, row, col, prop, value, cellProperties) {
  let escaped = Handsontable.helper.stringify(value)
  let img = null
  if (escaped.indexOf('http') === 0) {
    img = document.createElement('IMG') as HTMLImageElement
    img.style.maxWidth = '50px'
    img.style.maxHeight = '50px'
    img.src = value

    Handsontable.dom.addEvent(img, 'mousedown', function(e) {
      e.preventDefault() // prevent selection quirk
    })

    Handsontable.dom.empty(td)
    td.appendChild(img)
  } else {
    // render as text
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties])
    // Handsontable.renderers.TextRenderer.apply(instance, arguments as any)
  }

  return td
}
