import vis from 'vis-network'
import { data as dataModule } from './data'
import { document as documentModule } from './document'
import { view as viewModule } from './view'
import { loadXMLFile, walkXML, saveFile as fileSaver } from './helpers'
import NanoEvents from 'nanoevents'

const graphite = (container, initOptions = {}) => {
  const events = new NanoEvents()
  const {
    document: initDoc,
    data: initData,
    network: networkOptions = {}
  } = initOptions
  const data = dataModule(initData, events)
  const document = documentModule(initDoc, events)
  const view = viewModule(events)

  initNetwork(container)
  function initNetwork(container) {
    if (!container) { return null }
    view.network = new vis.Network(container, {
      nodes: data._nodes,
      edges: data._edges
    }, networkOptions)
  }
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
    get view() {
      return view
    },
    setContainer: (container) => {
      initNetwork(container)
    },
    loadFile,
    saveFile
  }
}

export default graphite
