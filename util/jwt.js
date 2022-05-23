// 加载第三方的 jwt 加载前执行安装: npm install jsonwebtoken 
// jsonwebtoken GitHub: https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken')

//对错误优先的函数 进行 promise风格化处理 *** 这里jwt的异步方式 刚好可以进行这样的处理
const { promisify } = require('util')


exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

// jwt.decode 不验证jwt的真实有效性 直接解析jwt 某些场景可能会用
exports.decode = promisify(jwt.decode)










/* 
// jwt基本使用
// 生成jwt 方式一  *** 传递两个参数 参数1: 需要处理的对象 ; 参数2: 密钥privateKey(自定义)
const token = jwt.sign({
    name: "张三",
    age: 12
}, '我是密钥')
console.log(token)


// 生成jwt 方式二 异步签名  两种方式生成的都是一样的 不过后者是异步生成的jwt  实际开发中更为推荐
jwt.sign({
    name: "张三",
    age: 12
}, '我是密钥', (err, token) => {
    err ? console.log('生成 jwt 失败') : console.log(token)
}
)

// verify 直译  证明 / 核实 / 证实 / 查证
// 验证 jwt 方式一:同步方式验证jwt  参数1: 需要验证的jwt 参数2: 密钥 (与生成时的密钥对应)
let ret = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiYWdlIjoxMiwiaWF0IjoxNjUzMjE5NDE3fQ.f2hxRtadgt9vT5Ep5B0mBzNznHrNa3fHZcys787WPGw',
    '我是密钥')

console.log(ret) //{ name: '张三', age: 12, iat: 1653219417 } 还原的数据中多了 iat属性 -> 签发时间


// 验证 jwt 方式二:异步方式验证jwt  参数1: 需要验证的jwt 参数2: 密钥 (与生成时的密钥对应) 参数3 : 回调函数
jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiYWdlIjoxMiwiaWF0IjoxNjUzMjE5NDE3fQ.f2hxRtadgt9vT5Ep5B0mBzNznHrNa3fHZcys787WPGw',
    '我是密钥',
    (err, ret) => {
        err ? console.log('jwt 验证失败') : console.log(ret)
    }
)
*/