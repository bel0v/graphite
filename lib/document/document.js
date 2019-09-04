function loadFile(file) {
  return new Promise(resolve => { // Edge
    // var file = e.target.files[0]
    const type = file.type
    var reader = new FileReader() // ie10
    reader.onload = function() {
      var parsed = new DOMParser().parseFromString(this.result, type) // ie9
      resolve({doc: parsed, name: file.name, type: file.type})
    }
    reader.readAsText(file)
  })
}


export const document = () => {
  let doc = null
  let name = ''
  let type = ''
  function load(file) {
    loadFile(file).then((res) => {
      doc = res.doc
      name = res.name
      type = res.type
    })
  }
  return {
    loadFile: load,
    get doc() {
      return doc
    },
    get name() {
      return name
    },
    get type() {
      return type
    }
  }
}