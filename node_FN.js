/*
 * @Description: node 业务常用方法
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2018-10-12 20:20:41
 * @LastEditTime: 2019-04-22 15:49:35
 */


/**
 * @Description: 简单的获取命令参数
 * @case: 
 * > node server.js --name=ajanuw --post=14
 * let a = new Argvs();
 *     a.argvsAll           // [ { name: 'ajanuw' }, { post: '14' } ]
 *     a.argvsGet('name')   // ajanuw
 *     a.argvsGet('post')   // 14
 *     a.argvsKeys()        // [ 'name', 'post' ]
 *     a.argvsHas('name')   // true
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-22 15:24:18z
 */
class Argvs {
  constructor() {
    this.argvsAll = this.argvsAll();
  }
  argvsAll() {
    return process.argv.slice(2).reduce((acc, item) => {
      item = item.split(/=/);
      const [k, v] = [item[0].replace(/-/gi, ''), item[1]];
      acc.push({
        [k]: v
      });
      return acc;
    }, [])
  }

  argvsGet(k) {
    return this.argvsAll.reduce((acc, item) =>
      acc ?
      acc :
      (k in item) ?
      acc = item[k] :
      acc, false)
  }

  argvsKeys(argvsAll) {
    if(!argvsAll) argvsAll = this.argvsAll;
    return argvsAll.reduce((acc, item) =>{
      return [...acc, ...Object.keys(item)]
    }, [])
  }
  argvsHas(k){
    return Object.is(this.argvsKeys().indexOf(k), -1) ? false : true;
  }
}



/**
 * @Description: 获取本地ip
 * @param {type} 
 * @return: {str} 127.0.0.1
 * @case: getIPAdress() >127.0.0.1
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-22 15:44:24
 */
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}


/**
 * @Description: 获取用户的ip
 * @param {obj} req
 * @return: {string} ::ffff:10.130.148.222
 * @case: getClientIp(req)
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-22 15:46:47
 */
function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip
}
