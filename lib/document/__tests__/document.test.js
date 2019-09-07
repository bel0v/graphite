import { document } from '../document'

it('inits document with empty constructor', () => {
  const d = document()
  expect(d.doc).toEqual(null)
})

describe('inits document with constructor', () => {
  it('inits document with doc', () => {
    const initProps = {
      doc: 'document',
      name: 'document name',
      type: 'text/xml'
    }
    const d = document(initProps)
    expect(d.doc).toEqual('document')
    expect(d.name).toEqual('document name')
    expect(d.type).toEqual('text/xml')
  })
})
