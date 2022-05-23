/**
 * 创建user子路由
 */

const express = require('express')
// 引入 controller下定义的user操作的逻辑代码 用于简化当前文件的体量
const userCtrl = require('../controller/user')
// 加载自定义字段验证中间件
const userValidator = require('../validator/user')
// 加载自定义用户验证中间件
const auth = require('../middleware/auth')


const router = express.Router()



// 用户登录 userCtrl.login 这里是把用户登录的逻辑操作 抽离到 /controller/user.js 里面并封装成了login方法  -- 使用前必须引入/controller/user.js 并命名为userCtrl
router.post('/users/login', userValidator.login, userCtrl.login)

// 用户注册 
router.post('/users', userValidator.register, userCtrl.register) //userValidator.register 校验中间件

// 获取当前登录用户  --- 路径是/api/user  没有s  *** 使用get请求
router.get('/user', auth, userCtrl.getCurrentUser) // auth 配置用户验证中间件 验证通过才能走userCtrl.getCurrentUser

// 更新当前用户  --- 路径是/api/user  没有s  *** 使用put请求
router.put('/user', auth, userCtrl.updateCurrentUser)



module.exports = router