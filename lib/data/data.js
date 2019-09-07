import vis from 'vis-network'

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

  function addNode(node) {
    const parentEdge = node.parentNode && {
      from: node.parentNode.__graph_id,
      to: node.__graph_id
    }
    nodes.add([
      {
        id: node.__graph_id,
        label: node.nodeName,
        level: node.level
        // y: node.level * 100,
        // x: randomFromMinusToPlus(200),
      }
    ])
    if (parentEdge) {
      edges.add([parentEdge])
    }
  }

  return {
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
    addNode
  }
}
