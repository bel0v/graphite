import { data } from '../data'
import vis from 'vis-network'
it('inits data with empty constructor', () => {
  const d = data()
  expect(d.nodes).toEqual(new vis.DataSet([]))
  expect(d.edges).toEqual(new vis.DataSet([]))
})

describe('inits data with constructor', () => {
  it('inits document with doc', () => {
    const initProps = {
      nodes: [{ from: 1, to: 2 }],
      edges: [{ id: 1 }, { id: 2 }]
    }
    const d = data(initProps)
    expect(d.nodes).toEqual(initProps.nodes)
    expect(d.edges).toEqual(initProps.edges)
  })
})
