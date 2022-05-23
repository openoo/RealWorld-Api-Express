/**
 * 创建应用主路由
 */


// 加载express  *** 创建路由必须加载先加载express
const express = require('express')

// 使用express中定义router路由器
const router = express.Router()


// // 用路由器响应处理get请求
// router.get('/', (req, res) => {
//     res.send('你好,世界')
// }
// )
// // 用路由器响应处理post请求
// router.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('你好,post')
// }
// )

// 挂载用户相关路由   *** 用中间件的方式 挂载当前目录下的user.js
router.use(require('./user'))

// 用户资料相关路由 *** 用中间件的方式 挂载当前目录下的./profile
router.use(require('./profile'))
// 在挂载路由前 指定请求路径profiles 则可以到profile.js中删除对应的路由前缀profiles 达到简写的目的
// router.use('/profiles', require('./profile'))

// 挂载文章相关路由
router.use(require('./article'))

// 挂载标签子路由
router.use(require('./tag'))

// 文章相关路由

// 导出并暴露路由
module.exports = router
