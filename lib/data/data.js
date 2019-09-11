import vis from 'vis-network'
import { Groups } from '../helpers'
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
export const data = (initProps = {}) => {
  const nodes = init(initProps.nodes)
  const edges = init(initProps.edges)
  const nodesGroups = Groups()
  const edgesGroups = Groups()
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
    data.add(values)
  }
  const update = (type) => value => {
    const data = type === 'nodes' ? nodes : edges
    data.update(value)
  }
  const remove = (type) => id => {
    const data = type === 'nodes' ? nodes : edges
    data.remove(id)
  }

  return {
    _addNode: addNode,
    get _nodes() {
      return nodes
    },
    get _edges() {
      return edges
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
