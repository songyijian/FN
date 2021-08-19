/*
 * @Description: fs 文件操作工具函数
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-19 14:41:22
 */

const path = require('path')
const fs = require('fs')

function isFileSync(path) {
  return fs.statSync(path).isFile()
}
