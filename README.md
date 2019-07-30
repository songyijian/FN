# 工作中长用的函数整理
> 原生js api的拓展（优势：减少import的引用链条复杂度）


### 原型拓展
```js
// 对Date对象做扩展
import dateProto from '~func/dateProto.js'
dateProto()
```

### 原型静态方法拓展

```js
//JosnStatic 上的一些
//consoleSatatic 在console上的拓展
import JosnStatic from '~func/JosnStatic.js'
import consoleSatatic from '~func/consoleSatatic.js'

JosnStatic()
consoleSatatic()
```
