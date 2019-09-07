import { saveAs } from 'file-saver'

const stripInternalIds = (string) => string.replace(/ __graph_id="[^"]*"/g, '')

export const saveFile = file => {
  const { doc, attrs } = file
  const serialized = new XMLSerializer().serializeToString(doc)
  const sanitized = stripInternalIds(serialized)
  const blob = new Blob([sanitized], { type: attrs.type })
  saveAs(blob, attrs.name)
}
