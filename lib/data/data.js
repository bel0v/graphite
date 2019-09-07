import vis from 'vis-network'

/**
 *
 * @param {Object} init - data properties to set
 * @param {Array|DataSet|DataView} nodes - graph nodes
 * @param {Array|DataSet|DataView} edges - graph edges
 */
export const data = (init = {}) => {
  const nodes = init.nodes || new vis.DataSet([])
  const edges = init.edges || new vis.DataSet([])
  return {
    get nodes() {
      return nodes
    },
    get edges() {
      return edges
    }
  }
}
