import vis from 'vis-network'
import { data as dataModule } from './data'
import { document as documentModule } from './document'
import { loadXMLFile, walkXML, saveFile as fileSaver } from './helpers'

const graphite = (container, initOptions = {}) => {
  const {
    document: initDoc,
    data: initData,
    network: networkOptions = {}
  } = initOptions
  const data = dataModule(initData)
  const document = documentModule(initDoc)
  const network = new vis.Network(container, {
    nodes: data._nodes,
    edges: data._edges
  }, networkOptions)

  /**
   * Async file loader. Loads file and builds graph data.
   * @param {File} file - xml or html file
   */
  const loadFile = (file) =>
    loadXMLFile(file).then((res) => {
      document.doc = res.doc
      document.name = res.name
      document.type = res.type
      return walkXML(res.doc, null, data._addNode)
    })

  const saveFile = () => {
    fileSaver(document.doc)
  }

  return {
    get data() {
      return data
    },
    get document() {
      return document
    },
    get network() {
      return network
    },
    loadFile,
    saveFile
  }
}

export default graphite
