/*
 * @Description: 责任链
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-19 16:37:08
 */

/***
 * promise 中间件
 * use() 接收一个promise 对象
 */
class Chain {
  constructor() {
    this.db = []
  }
  use(part) {
    this.db.push(part)
    return this
  }
  run(...arg) {
    return this.db.reduce((a, f) => a.then(_ => f(...arg)), Promise.resolve())
  }
}

const a = async a => a + 1
const b = async a => a + 2
const err = async a => {
  throw Error('断开xxxxxxx')
}

let ff = new Chain().use(a).use(err).use(b).run(1)
ff.then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
