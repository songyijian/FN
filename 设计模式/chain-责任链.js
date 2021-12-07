/*
 * @Description: 责任链
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-19 16:37:08
 */

/***
 * promise 职责连
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

{
  // promise 职责连 test
  // const a = async a => a + 1
  // const b = async a => a + 2
  // const err = async a => {
  //   throw Error('断开xxxxxxx')
  // }
  //   let ff = new Chain().use(a).use(b).use(b).run(1)
  //   ff.then(data => {
  //     console.log(data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
}

/**
 * 洋葱模型，中间件
 */
function nextfn() {
  const db = {
    list: [],
    use(fn) {
      typeof fn === 'function' && this.list.push(fn)
      return this
    },
    next(a) {
      return this.list.length && this.list.shift()(a, this.next.bind(this))
    },
    run(arg) {
      return this.next(arg)
    }
  }
  return db
}

{
  let app = new nextfn()
  app.use(async (ctx, next) => {
    console.log('1')
    await next(111)
    console.log('2')
  })
  app.use((ctx, next) => {
    console.log('3', ctx)
    // next()
    console.log('4')
  })
  app.use(async (ctx, next) => {
    console.log('5')
    await next()
    console.log('6')
  })

  const fn = async () => {
    console.log('/1/洋葱模型，中间件//', a)
    var a = await app.run()
    console.log('/2/洋葱模型，中间件//', a)
  }
  fn()
}

/**
 * Promise 同步版本
 */
class NextPromise {
  constructor() {
    this.db = []
  }
  use(fn) {
    typeof fn === 'function' && this.db.push(fn)
    return this
  }
  async next(a) {
    if (this.db.length) return await this.db.shift(1)(a, this.next.bind(this))
  }
  run(a) {
    return this.next(a)
  }
}

{
  let app = new NextPromise()
  // app.use(async (ctx, next) => {
  //   console.log('1', ctx)
  //   await next(2000)
  //   console.log('2')
  // })
  // app.use((ctx, next) => {
  //   console.log('3', ctx)
  //   next(300)
  //   console.log('4')
  // })
  // app.use(async (ctx, next) => {
  //   console.log('5')
  //   await next(4000)
  //   console.log('6')
  // })

  // const fn = async () => {
  //   console.log('/1///')
  //   var a = await app.run()
  //   console.log('/2///', a)
  // }
  // fn(1000)
}
