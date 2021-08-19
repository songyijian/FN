// 函数组合
function flowFunc(...fns) {
  const dbfn = [...fns]
  return arg => dbfn.reduce((a, fn) => fn(a), arg)
}

// const fn1 = a => a + 1
// const fn2 = a => a + 1
// const fn3 = a => a + 1
// const myfn = flowFunc(fn1, fn2, fn3);
// console.log(myfn(10)); // 13

class Task {
  constructor(val) {
    this.value = val
  }
  map(fn) {
    let fns = flowFunc(fn, this.value)
    return new Task(fns)
  }
  start(n) {
    return this.value(n)
  }
  static of(val) {
    return new Task(val)
  }
}

const f1 = i => i + 10
const fmap = i => i + 100

let a = Task.of(f1).map(fmap).start(2) // 112
let b = Task.of(f1).map(fmap).map(fmap).map(fmap).start(2) // 312

// console.log(a, b)

const aTask = function (value) {
  const a = {
    value,
    map(fn) {
      let fns = flowFunc(fn, this.value)
      return aTask(fns)
    },
    start(n) {
      return this.value(n)
    }
  }
  return a
}

let c = aTask(f1).map(fmap).start(2) // 112
let d = aTask(f1).map(fmap).map(fmap).map(fmap).start(2) // 312

console.log(c, d)
