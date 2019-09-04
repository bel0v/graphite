import { data } from './data'

test('data module', () => {
  const d = data()
  expect(d.edges).toEqual([])
  expect(d.nodes).toEqual([])
})
