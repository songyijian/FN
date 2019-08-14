
// 返回小数点后有几位
function getFloatN(n) {
  try {
    if(typeof n === "number"){
        return Number.isSafeInteger(n) ? 0 : n.toString().split('.')[1].length
    }else {
        return false
    }
  } catch (e) {
    return false
  }
}
