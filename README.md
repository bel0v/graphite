

![build](https://img.shields.io/circleci/build/github/bel0v/graphite?style=flat)

# Требования

Рекомендованы современные браузеры на основе Chromium. Работа в Internet Explorer не гарантируется.

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
import graphite from '@bel0v/graphite'

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

`loadFile(file: File)` - загрузить XML или HTML файл.

`saveFile()` - сохранить XML или HTML файл (пока что работает, только если файл уже был загружен, т.е. с нуля файл не создается)

## Data

### Свойства:

`nodes: Array<Node>` - список вершин(узлов). Базовая структура узла:
  ```javascript
  // Node
  {
    id: String, // ID узла
    label: String, // отображаемое имя
    level: Number, // уровень вложенности
    groups: Array, // группы, к которым принадлежит узел
  }
  ```

`edges: Array<Edge>` - список рёбер. Базовая структура ребра:
  ```javascript
  // Edge
  {
    from: NodeId,
    to: NodeId,
    id: String,
  }
  ```

`nodesGroups: Groups` - группы узлов;

`edgesGroups: Groups` - группы рёбер.

[Подробнее про тип данных Groups](#Groups)

### Методы:

`addNodes(nodes: Array<Node>)`

`updateNode(node: Node)`

`removeNode(id: NodeId)`

`addEdges(nodes: Array<Edge>)`

`updateEdge(edge: Edge)`

`removeEdge(id: EdgeId)`

– Данные методы соответствуют методам add, update и remove на структуре данных [vis.DataSet](https://visjs.github.io/vis-data/data/dataset.html).

### Groups

```javascript
// Group
{
  name: String, // имя группы
  id: String(optional), // id группы
  properties: Object(optional), // свойства группы
  members: Array(optional), // члены группы
}
```
Введён тип данных `Groups`, который вклчает в себя некое множество групп одного типа. Сущностей Groups две: `nodesGroups` и `edgesGroups`.

Свойства класса `Groups`:

`list: Array<Group>` - выводит список групп

Методы класса `Groups`:


`addGroup(group: Group)` - добавить группу

`addGroupMembers(members: Array)` - добавить членов группы

`findByName(name: String)` - найти группу по имени

`findById(id: String)` - найти группу по ID

 `remove({id: String, name: String})` - удалить группу по ID или имени

 `getGroupMembers({id: String, name: String})` - найти членов группы по имени или ID. То же самое, что
 ```javascript
 findByName(name).members
 //или
findById(id).members
 ```

 `setGroupProperties({id: String, name: String})` Задать свойства группы по ID или имени. Свойства могут быть любыми, например, поддерживаемыми [свойствами узлов vis.js](https://visjs.github.io/vis-network/docs/network/nodes.html)

 `getGroupProperties({id: String, name: String})` Найти свойства группы по ID или имени. То же самое, что
 ```javascript
 findByName(name).properties
```

## Document

`doc` - сам документ

`name` - имя документа

`type` - тип документа

## Network

#### Интерфейс network библиотеки vis.js.

*NB! Для взаимодействий с данными используйте модуль [Data](#Data).*

Данный модуль полезен для создания [подписок на события](https://visjs.github.io/vis-network/docs/network/#Events) и иных низкоуровневых взаимодействий с графом. (См. [Network methods](https://visjs.github.io/vis-network/docs/network/#methods) в документации vis.js)


# TODO

- работа с JSON
- saveFile() для новых файлов