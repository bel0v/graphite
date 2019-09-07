
/**
 *
 * @param {Object} init - document properties to set
 * @param {Document} init.doc - the Document object
 * @param {string} init.name - Document name
 * @param {string} init.type - Document type
 */
export const document = (init = {}) => {
  let doc = init.doc || null
  let name = init.name || ''
  let type = init.type || ''
  return {
    get doc() {
      return doc
    },
    get name() {
      return name
    },
    get type() {
      return type
    },
    set doc(value) {
      doc = value
    },
    set name(value) {
      name = value
    },
    set type(value) {
      type = value
    }
  }
}
