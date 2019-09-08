

![build](https://img.shields.io/circleci/build/github/bel0v/graphite?style=flat)

# Требования

# Установка
Библиотеку можно установить двумя способами:

1) Добавить как внешний `script` в html-документ. Тогда в объекте `window` будет доступен конструктор `graphite()`

```html
<script src="/path/to/script.js"></script>
<script>
  var graph = window.graphite(...)
  ...
</script>
```

2) Установить модуль через `npm` или `yarn`

```shell
> npm install @belov/graphite
```

```javascript
import graphite from '@belov/graphite'

const graph = graphite(...)
...
```

# Использование

Для начала работы необходимо вызвать конструктор `graphite(container, options)`. В параметре `options` можно передать имеющиеся исходные данные и настройки. Кроме того, опции можно обновлять и добавлять после инициализации. (см. [API](#API))

```javascript
// конструктор без опций
var container = document.getElementById('container')
var emptyGraph = graphite(container)

var myGraphData = {
  nodes: [{ id: 1 }, { id: 2 }]
  edges: [{ from: 1, to: 2 }],
}
// конструктор с некоторыми заполненными данными
var prefilledGraph = graphite(container, {data: myGraphData})
```

# API

Перечисленные методы вызываются у объекта, созданного с помощью конструктора `graphite()`.

1. [Общее](#общее)

Модули:
1. [Data](#data)
2. [Document](#document)
3. [View](#view)

## Общее

`loadFile()`

`saveFile()`

## Data

`nodes`

`edges`

`addNodes()`

`updateNode()`

`removeNode()`

`addEdges()`

`updateEdge()`

`removeEdge()`

`nodesGroups`

  -  addGroup(),
    addGroupMember(),
    findByName(),
    list
    remove(),
    getGroupMembers()

`edgesGroups`
 - same

## Document

`doc`

`name`

`type`

## View
