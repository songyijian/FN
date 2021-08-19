// 函数组合
function flowFunc(...fns) {
  const dbfn = [...fns];
  return arg => dbfn.reduce((a, fn) => fn(a), arg);
}

const fn1 = a => a + 1;
const fn2 = a => a + 1;
const fn3 = a => a + 1;
const myfn = flowFunc(fn1, fn2, fn3);

console.log(myfn(10)); // 13
