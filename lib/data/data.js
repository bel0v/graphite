import vis from 'vis-network'
import { Groups } from '../helpers'
import e from '../constants/events'

function init(item) {
  if (!item) {
    return new vis.DataSet([])
  }
  if (item instanceof Array) {
    return new vis.DataSet(item)
  }
  return item
}

/**
 *
 * @param {Object} initProps - data properties to set
 * @param {Array|DataSet|DataView} nodes - graph nodes
 * @param {Array|DataSet|DataView} edges - graph edges
 */
export const data = (initProps = {}, events) => {
  const nodes = init(initProps.nodes)
  const edges = init(initProps.edges)
  const nodesGroups = Groups([])
  const edgesGroups = Groups([])
  let _activeNodesGroups = []
  let _activeEdgesGroups = []
  const nodesFilter = (item) => item.groups
    ? item.groups.some(groupId => _activeNodesGroups.includes(groupId))
    : true
  const edgesFilter = (item) => item.groups
    ? item.groups.some(groupId => _activeEdgesGroups.includes(groupId))
    : true
  const nodesView = new vis.DataView(nodes, { filter: nodesFilter })
  const edgesView = new vis.DataView(edges, { filter: edgesFilter })
  events && events.on(e.SET_ACTIVE_NODES_GROUPS, (groups) => {
    _activeNodesGroups = groups
    nodesView.refresh()
  })
  events && events.on(e.SET_ACTIVE_EDGES_GROUPS, (groups) => {
    _activeEdgesGroups = groups
    edgesView.refresh()
  })
  nodesGroups.on(e.ADD_GROUP_MEMBERS, ({ groupName, memberIds }) => {
    const updatedNodes = nodes
      .get(memberIds)
      .map(node => ({
        ...node,
        groups: [...(node.groups || []), groupName]
      }))
    nodes.update(updatedNodes)
    nodesView.refresh()
  })
  edgesGroups.on(e.ADD_GROUP_MEMBERS, ({ groupName, memberIds }) => {
    const updatedEdges = edges
      .get(memberIds)
      .map(edge => ({
        ...edge,
        groups: [...(edge.groups || []), groupName]
      }))
    edges.update(updatedEdges)
    edgesView.refresh()
  })

  function addNode(node) {
    const parentEdge = node.parentNode && {
      from: node.parentNode.__graph_id,
      to: node.__graph_id
    }
    nodes.add([
      {
        id: node.__graph_id,
        label: node.nodeName,
        level: node.level,
        groups: []
        // y: node.level * 100,
        // x: randomFromMinusToPlus(200),
      }
    ])
    if (parentEdge) {
      edges.add([parentEdge])
    }
  }
  const add = (type) => (values) => {
    if (!(values instanceof Array)) {
      throw new TypeError('Expected an array')
    }
    const data = type === 'nodes' ? nodes : edges
    return data.add(values)
  }
  const update = (type) => value => {
    const data = type === 'nodes' ? nodes : edges
    return data.update(value)
  }
  const remove = (type) => id => {
    const data = type === 'nodes' ? nodes : edges
    return data.remove(id)
  }

  return {
    _addNode: addNode,
    get _nodes() {
      return nodesView
    },
    get _edges() {
      return edgesView
    },
    get nodes() {
      return nodes.get()
    },
    get edges() {
      return edges.get()
    },
    get nodesGroups() {
      return nodesGroups
    },
    get edgesGroups() {
      return edgesGroups
    },
    addNodes: add('nodes'),
    updateNode: update('nodes'),
    removeNode: remove('nodes'),
    addEdges: add('edges'),
    updateEdge: update('edges'),
    removeEdge: remove('edges')
  }
}
