# 函数整理


### reckonFN.js 一些算法函数整理
```
  RepeatBit   //找出单层数组，重复值的始末位置
```

### FN.js 工作中常用方法整理
```
  getObjectURL      //获取file文件的本地url地址
  getImgSize        //获取图片文件的信息（width,height）
  cutStr            //按照字节长度取字符串
  trimRegion        //干掉URL的origin
  escapeHtml        //html尖括号转译
  templateFill      //模版替换函数 {var}
  URLParams         //url参数序列化和反序列化



  Random ---------
    randomNum     //生成指定范围随机数
```

### isFN.js 工作中常用方法整理
```
  isString
  isNumber
  isBoolean
  isTrue
  isFunction
  isNull
  isUndefined
  isObj
  isArray
  isDate
  isRegExp
  isError
  isSymbol
  isPromise
  isSet
  isFalse
  isFile
  isArrayBuffer

  isContainCN     //是否包含中文字符

  isIdCard        //是否为身份证号
  isPhoneNum      //是否为手机号
  isUrl           //是否为URL地址

```

### nodeFN.js Node业务常用方法
```

```

### windowFN.js 关于dom、css、浏览器
```
  supportsCSS   //检查浏览器是否支持CSS
  getStyle      //获取dom对象的样式
  setCookie      //设置Cookie
  getCookie      //读取cookie

  removeCookie    //删除cookie
```


### 原型静态方法拓展
```
import JSONStatic from './JSONStatic.js'
import consoleStatic from './consoleStatic.js'
import dateProto from '~func/dateProto.js'

JSONStatic()
consoleStatic()
dateProto()  
```
