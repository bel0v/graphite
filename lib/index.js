import { data as dataModule } from './data'
import { document as documentModule } from './document'

const graphite = (initOptions = {}) => {
  const {
    document: initDoc,
    data: initData
  } = initOptions
  const data = dataModule(initData)
  const document = documentModule(initDoc)
  return {
    get data() {
      return data
    },
    get document() {
      return document
    }
  }
}

export default graphite
