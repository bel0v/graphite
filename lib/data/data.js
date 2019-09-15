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
  nodesGroups.on(e.ADD_GROUP_MEMBERS, ({ groupName, memberIds }) => {
    const updatedNodes = nodes
      .get(memberIds)
      .map(node => ({
        ...node,
        groups: [...(node.groups || []), groupName]
      }))
    nodes.update(updatedNodes)
    events && events.emit(e.UPDATE_NODES)
  })
  edgesGroups.on(e.ADD_GROUP_MEMBERS, ({ groupName, memberIds }) => {
    const updatedEdges = edges
      .get(memberIds)
      .map(edge => ({
        ...edge,
        groups: [...(edge.groups || []), groupName]
      }))
    edges.update(updatedEdges)
    events && events.emit(e.UPDATE_EDGES)
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
    events && events.emit(e.DATA_UPDATE)
    return data.add(values)
  }
  const update = (type) => value => {
    const data = type === 'nodes' ? nodes : edges
    events && events.emit(e.DATA_UPDATE)
    return data.update(value)
  }
  const remove = (type) => id => {
    const data = type === 'nodes' ? nodes : edges
    events && events.emit(e.DATA_UPDATE)
    return data.remove(id)
  }

  return {
    _addNode: addNode,
    _nodes: nodes,
    _edges: edges,
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
