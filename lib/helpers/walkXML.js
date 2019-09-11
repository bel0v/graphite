import uuid from 'uuid/v4'
/* eslint-disable no-loop-func */

// function readXml(xmlFile) {
//   xmlhttp = new XMLHttpRequest()
//   xmlhttp.open('GET', xmlFile, false)
//   if (xmlhttp.overrideMimeType) {
//     xmlhttp.overrideMimeType('text/xml')
//   }
//   xmlhttp.send(null)
//   const xmlDoc = xmlhttp.responseXML
//   return xmlDoc
// }

function bfs(node, maxLevel, nodeCallback) {
  const queue = []
  node.level = node.level || 1
  const id = node.__graph_id || uuid()
  node.__graph_id = id
  if (node.setAttribute) {
    node.setAttribute('__graph_id', id)
  }
  while (node) {
    nodeCallback(node)
    if (!maxLevel || node.level < maxLevel) {
      ;[...node.children].forEach(child => {
        child.level = node.level + 1
        const childId = child.__graph_id || uuid()
        child.__graph_id = childId
        if (child.setAttribute) {
          child.setAttribute('__graph_id', childId)
        }
        queue.push(child)
      })
    }
    node = queue.shift()
  }
  return Promise.resolve('all nodes processed')
}

export function walkXML(doc, maxLevel, nodeCallback) {
  return bfs(doc, maxLevel, nodeCallback)
}
