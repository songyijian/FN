/*
 * @Description: 责任链
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-19 16:37:08
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
    return this.db.reduce((a, f) => f(a), Promise.resolve(...arg))
  }
}

let a = a => a + 1
let b = a => 21
let c = a => a + 1

;(async () => {
  try {
    const chain = await new Chain().use(a).use(b).use(c).run(10)
    console.log(chain)
  } catch (error) {
    console.error(error)
  }
})()
