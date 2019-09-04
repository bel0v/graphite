import { data as dataModule } from './data'
import { document as documentModule } from './document'

const graphite = () => {
  const data = dataModule()
  const document = documentModule()
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
