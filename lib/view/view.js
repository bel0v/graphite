
import vis from 'vis-network'
import e from '../constants/events'

export const view = (data, events) => {
  let network
  let _activeNodesGroups = []
  let _activeEdgesGroups = []
  let allowRender = false
  const nodesFilter = (item) => {
    if (!allowRender) { return false }
    if (_activeNodesGroups.length === 0) {
      return true
    }
    if (!item.groups) {
      return false
    }
    return item.groups.some(groupName => _activeNodesGroups.includes(groupName))
  }
  const edgesFilter = (item) => {
    if (!allowRender) { return false }
    if (_activeEdgesGroups.length === 0) {
      return true
    }
    if (!item.groups) {
      return false
    }
    return item.groups.some(groupName => _activeEdgesGroups.includes(groupName))
  }

  events.on(e.UPDATE_NODES, () => nodesView.refresh())
  events.on(e.UPDATE_EDGES, () => edgesView.refresh())

  const nodesView = new vis.DataView(data._nodes, { filter: nodesFilter })
  const edgesView = new vis.DataView(data._edges, { filter: edgesFilter })

  function setActiveNodesGroups(groups) {
    _activeNodesGroups = groups
    nodesView.refresh()
  }
  function setActiveEdgesGroups(groups) {
    _activeEdgesGroups = groups
    edgesView.refresh()
  }

  return {
    _nodes: nodesView,
    _edges: edgesView,
    flushData: () => {
      console.log('flush...')
      allowRender = true
      nodesView.refresh()
      edgesView.refresh()
      network.fit()
    },
    get nodes() {
      return nodesView.get()
    },
    get edges() {
      return edgesView.get()
    },
    get network() {
      return network
    },
    set network(value) {
      network = value
    },
    set activeNodesGroups(groups) {
      setActiveNodesGroups(groups)
    },
    get activeNodesGroups() {
      return _activeNodesGroups
    },
    set activeEdgesGroups(groups) {
      setActiveEdgesGroups(groups)
    },
    get activeEdgesGroups() {
      return _activeEdgesGroups
    }
  }
}
