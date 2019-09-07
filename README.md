
# Требования

# Установка
Библиотеку можно установить двумя способами:

1) Добавить как внешний `script` в html-документ. Тогда в объекте `window` будет доступен конструктор `graphite()`

```html
<script src="/path/to/script.js"></script>
<script>
  var graph = window.graphite()
  ...
</script>
```

2) Установить модуль через `npm` или `yarn`

```shell
> npm install @belov/graphite
```

```javascript
import graphite from '@belov/graphite'

const graph = graphite()
...
```

# Использование

Для начала работы необходимо вызвать конструктор `graphite()`. В качестве параметров конструктора можно задать имеющиеся исходные данные. Также данные можно обновлять и добавлять после инициализации. (см. [API](#API))

```javascript
// пустой конструктор
var emptyGraph = graphite()

var myGraphData = {
  nodes: [{ from: 1, to: 2 }],
  edges: [{ id: 1 }, { id: 2 }]
}
// конструктор с данными
var prefilledGraph = graphite({data: myGraphData})
```

# API

Перечисленные методы вызываются у объекта, созданного с помощью конструктора `graphite()`.

1. [Общее](#общее)

Модули:
1. [Data](#data)
2. [Document](#document)
3. [View](#view)

## Общее

`loadFile`

`saveFile`

## Data

`nodes`

`edges`

## Document

`doc`

`name`

`type`

## View
