import graphite from '../../index'

const graph = graphite()

describe('setActiveGroups', () => {
  it('should set active nodes groups', () => {
    graph.view.activeNodesGroups = ['id1']
    expect(graph.view.activeNodesGroups).toEqual(['id1'])
  })
  it('should set active edges groups', () => {
    graph.view.activeEdgesGroups = ['id1']
    expect(graph.view.activeEdgesGroups).toEqual(['id1'])
  })
})
