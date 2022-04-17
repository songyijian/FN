/*
 * @Description: 自定义数据结构
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-04-14 15:01:21
 */

// 驼峰命名法(CamelCase)和下划线命名法(UnderScoreCase) 兼容处理
// 大小驼峰适配器

/*下划线转驼峰*/
function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/* 驼峰转换下划线*/
function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function holdKeys(data) {
  return new Proxy(data, {
    get(target, key) {
      let value = Reflect.get(target, key)
      return (
        value ||
        Reflect.get(target, toHump(key)) ||
        Reflect.get(target, toLine(key))
      )
    },
    set(target, key, val) {
      let value = Reflect.get(target, key)
      if (value) return Reflect.set(target, key, val)
      if (Reflect.get(target, toHump(key)))
        return Reflect.set(target, toHump(key), val)
      if (Reflect.get(target, toLine(key)))
        return Reflect.set(target, toLine(key), val)
      Reflect.set(target, key, val)
    }
  })
}

const test = {
  name: 'xiaoming',
  age: 133,
  tD: 1,
  tb_c: 2
}

const a = holdKeys(test)
console.log(a.t_d)
a.t_d = 'xxxx'
console.log(a.tD, a.t_d)

// const a = 'name_sas'
// console.log(toHump(a), toLine('nameSas'))
