import graphite from '../../index'

describe('setActiveGroups', () => {
  const graph = graphite()
  it('should set active nodes groups', () => {
    graph.view.activeNodesGroups = ['id1']
    expect(graph.view.activeNodesGroups).toEqual(['id1'])
  })
  it('should set active edges groups', () => {
    graph.view.activeEdgesGroups = ['id1']
    expect(graph.view.activeEdgesGroups).toEqual(['id1'])
  })

  it('should filter view nodes by groups', () => {
    const graph = graphite()
    const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }]
    graph.data.addNodes(nodes)
    expect(graph.data.nodes).toEqual(nodes)
    expect(graph.view.nodes).toEqual(nodes)
    graph.data.nodesGroups.addGroup({ name: 'a group to display', members: [2] })
    expect(graph.view.nodes).toEqual([
      { id: 1 },
      { id: 2, groups: ['a group to display'], group: 'a group to display' },
      { id: 3 }])
    graph.view.activeNodesGroups = ['a group to display']
    expect(graph.view.nodes).toEqual([{ id: 2, groups: ['a group to display'], group: 'a group to display' }])
  })
  it('should choose all nodes if activeGroups is empty', () => {
    const graph = graphite()
    const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }]
    graph.data.addNodes(nodes)
    graph.data.nodesGroups.addGroup({ name: 'test group', members: [2] })
    graph.view.activeNodesGroups = ['test group']
    expect(graph.data.nodes.length).toEqual(3)
    expect(graph.view.nodes.length).toEqual(1)
    graph.view.activeNodesGroups = []
    expect(graph.view.nodes.length).toEqual(3)
  })
})
