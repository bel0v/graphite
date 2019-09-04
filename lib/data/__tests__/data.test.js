import { data } from '../data'

it('data module', () => {
  const d = data()
  expect(d.edges).toEqual([])
  expect(d.nodes).toEqual([])
})
