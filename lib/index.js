import { data as dataModule } from './data'
import { document as documentModule } from './document'
import { loadXMLFile, walkXMl } from './helpers'

const graphite = (initOptions = {}) => {
  const {
    document: initDoc,
    data: initData
  } = initOptions
  const data = dataModule(initData)
  const document = documentModule(initDoc)

  /**
   * Async file loader. Loads file and builds graph data.
   * @param {File} file - xml or html file
   */
  const loadFile = (file) =>
    loadXMLFile(file).then((res) => {
      document.doc = res.doc
      document.name = res.name
      document.type = res.type
      return walkXMl(res.doc, null, data.addNode)
    })

  return {
    get data() {
      return data
    },
    get document() {
      return document
    },
    loadFile
  }
}

export default graphite
