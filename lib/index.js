import vis from 'vis-network'
import { data as dataModule } from './data'
import { document as documentModule } from './document'
import { view as viewModule } from './view'
import { loadXMLFile, walkXML, saveFile as fileSaver } from './helpers'
import NanoEvents from 'nanoevents'

const defaultNetworkOptions = {
  physics: {
    stabilization: { enabled: false }
  },
  edges: {
    smooth: {
      type: 'continuous'
    },
    arrows: 'to'
    // hidden: true -- TODO: add optimizaiton
  }
}

const graphite = (container, initOptions = {}) => {
  const events = new NanoEvents()
  const {
    document: initDoc,
    data: initData,
    network: networkOptions = defaultNetworkOptions
  } = initOptions

  const data = dataModule(initData, events)
  const document = documentModule(initDoc, events)

  const view = viewModule(data, events)

  initNetwork(container)
  function initNetwork(container) {
    if (!container) { return null }
    view.network = new vis.Network(container, {
      nodes: view._nodes,
      edges: view._edges
    }, networkOptions)
  }

  function flushDataToView() {
    view.flushData()
    return Promise.resolve()
  }

  /**
   * Async file loader. Loads file and builds graph data.
   * @param {File} file - xml or html file
   */
  const loadFile = (file, { immediateRender = true } = {}) => {
    if (immediateRender === false) {
      view._allowRender(false)
    }
    return loadXMLFile(file).then((res) => {
      document.doc = res.doc
      document.name = res.name
      document.type = res.type
      return walkXML(res.doc, null, data._addNode).then(
        immediateRender ? flushDataToView : () => Promise.resolve()
      )
    })
  }

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
