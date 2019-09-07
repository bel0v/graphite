// function loadFile(file) {
//   return new Promise(resolve => { // Edge
//     // var file = e.target.files[0]
//     const type = file.type
//     var reader = new FileReader() // ie10
//     reader.onload = function() {
//       var parsed = new DOMParser().parseFromString(this.result, type) // ie9
//       resolve({ doc: parsed, name: file.name, type: file.type })
//     }
//     reader.readAsText(file)
//   })
// }
// function load(file) {
//   loadFile(file).then((res) => {
//     doc = res.doc
//     name = res.name
//     type = res.type
//   })
// }

/**
 *
 * @param {Object} init - document properties to set
 * @param {Document} init.doc - the Document object
 * @param {string} init.name - Document name
 * @param {string} init.type - Document type
 */
export const document = (init = {}) => {
  const doc = init.doc || null
  const name = init.name || ''
  const type = init.type || ''
  return {
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
