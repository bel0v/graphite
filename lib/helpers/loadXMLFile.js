export function loadXMLFile(file) {
  if (!(file instanceof File)) {
    throw new TypeError('expected a File object.')
  }
  return new Promise(resolve => { // Edge
    const type = file.type
    if (type !== 'text/xml' && type !== 'text/html') {
      throw new TypeError('An XML or HTML file expected')
    }
    var reader = new FileReader() // ie10
    reader.onload = function() {
      var parsed = new DOMParser().parseFromString(this.result, type) // ie9
      resolve({ doc: parsed, name: file.name, type: file.type })
    }
    reader.readAsText(file)
  })
}
