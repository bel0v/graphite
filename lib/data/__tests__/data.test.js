import { data } from '../data'
import vis from 'vis-network'

describe('internal API', () => {
  it('inits data with empty constructor', () => {
    const d = data()
    expect(d._nodes).toEqual(new vis.DataSet([]))
    expect(d._edges).toEqual(new vis.DataSet([]))
  })

  it('inits document with non-empty constructor', () => {
    const initProps = {
      nodes: [{ from: 1, to: 2 }],
      edges: [{ id: 1 }, { id: 2 }]
    }
    const d = data(initProps)
    expect(d._nodes).toEqual(new vis.DataSet(initProps.nodes))
    expect(d._edges).toEqual(new vis.DataSet(initProps.edges))
  })

  it('addNode', () => {
    const d = data()
    d._addNode({
      __graph_id: 'nodeId',
      nodeName: 'node name',
      level: 1,
      parentNode: {
        __graph_id: 'parentId'
      }
    })
    expect(d.nodes).toEqual([{
      id: 'nodeId',
      label: 'node name',
      level: 1,
      groups: []
    }])
    expect(d.edges.length).toEqual(1)
    expect(d.edges[0].from).toEqual('parentId')
    expect(d.edges[0].to).toEqual('nodeId')
  })
})

describe('public methods', () => {
  const initProps = {
    nodes: [{ from: 1, to: 2 }],
    edges: [{ id: 1 }, { id: 2 }]
  }
  const Data = data(initProps)
  test('get nodes', () => {
    expect(Data.nodes).toEqual(initProps.nodes)
  })
  test('get edges', () => {
    expect(Data.edges).toEqual(initProps.edges)
  })
  test('addNodes', () => {
    const Data = data({ edges: [{ from: 1, to: 2 }] })
    const nodes1 = [{ id: 1 }, { id: 2, lol: 'kek' }]
    Data.addNodes(nodes1)
    expect(Data.nodes).toEqual(nodes1)
    expect(Data.edges.length).toEqual(1)
    Data.addNodes([{ id: 3 }])
    expect(Data.nodes).toEqual([...nodes1, { id: 3 }])
    expect(Data.edges.length).toEqual(1)
  })
  test('updateNode', () => {
    const Data = data({ nodes: [{ id: 1 }] })
    expect(Data.nodes).toEqual([{ id: 1 }])
    Data.updateNode({ id: 1, lol: 'kek' })
    expect(Data.nodes).toEqual([{ id: 1, lol: 'kek' }])
    Data.updateNode({ id: 2, lol: 'lul' })
    expect(Data.nodes).toEqual([
      { id: 1, lol: 'kek' },
      { id: 2, lol: 'lul' }
    ])
  })
  test('removeNode', () => {
    const Data = data({ nodes: [{ id: 1 }, { id: 2 }] })
    Data.removeNode(1)
    expect(Data.nodes).toEqual([{ id: 2 }])
    Data.removeNode(2)
    expect(Data.nodes).toEqual([])
    Data.removeNode(3)
    expect(Data.nodes).toEqual([])
  })
  test('addEdges', () => {
    const Data = data({ nodes: [{ id: 1 }, { id: 2 }] })
    const edges1 = [{ from: 1, to: 2 }, { from: 2, to: 3 }]
    Data.addEdges(edges1)
    expect(Data.nodes).toEqual([{ id: 1 }, { id: 2 }])
    expect(Data.edges.length).toEqual(2)
  })
  test('updateEdge', () => {
    const Data = data({ edges: [{ from: 1, to: 2 }] })
    const id = Data.edges[0].id
    Data.updateEdge({ id, from: 1, to: 3 })
    expect(Data.edges.length).toEqual(1)
    expect(Data.edges[0].from).toEqual(1)
    expect(Data.edges[0].to).toEqual(3)
  })
  test('removeEdge', () => {
    const Data = data({
      nodes: [{ id: 1 }, { id: 2 }],
      edges: [{ from: 1, to: 2 }]
    })
    const id = Data.edges[0].id
    Data.removeEdge(id)
    expect(Data.nodes).toEqual([{ id: 1 }, { id: 2 }])
    expect(Data.edges).toEqual([])
    Data.removeEdge(id)
    expect(Data.edges).toEqual([])
  })
})
