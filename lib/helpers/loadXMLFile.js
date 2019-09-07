export function loadXMLFile(file) {
  return new Promise(resolve => { // Edge
    const type = file.type
    var reader = new FileReader() // ie10
    reader.onload = function() {
      var parsed = new DOMParser().parseFromString(this.result, type) // ie9
      resolve({ doc: parsed, name: file.name, type: file.type })
    }
    reader.readAsText(file)
  })
}
