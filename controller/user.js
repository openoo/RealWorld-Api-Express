// 导入数据模型
const { User } = require('../model')
// 加载自定义的jwt方法
const jwt = require('../util/jwt')

// 加载默认配置 *** 这里加载的原因是我们要是使用我们定义的密钥 jwtSecret
const { jwtSecret } = require('../config/config.default')

// 用户登录
exports.login = async (req, res, next) => {
    try {
        // 1. 验证数据 这步通过 validate中间件处理
        // 2. 生成token
        const user = req.user.toJSON() // 注意这里的req.user已经被数据验证的alidate中间件改过了 而且它是mongodb处理的对象 我们要使用需要对他进行json处理
        let token = await jwt.sign({
            userId: user._id // 这里传入的对象 可以是整个user 但是user中包含了password 所以 我们就指定了需要的必要数据
        }, jwtSecret, {
            expiresIn: '30d' //有效期 默认是秒 300h 指的是300h小时过期 '30 days : 30天过期 '7d': 7天过期 若这个对象不传 就表示永久有效期
        })
        token = `Bearer ${token}` // 没啥实际意义 只是jwt官方文档让我们加上Bearer 修饰前缀  (相当于jwt身份标记把)
        // 3.处理需要展示的数据
        delete user.password // 我们不希望password被展示到前端 所以 我们删除后在响应
        // 4. 响应数据
        res.status(200).json({
            ...user, //解构user
            token // 拼接上面生成的token
        })
    } catch (error) {
        // next() 流转错误处理到错误处理中间件
        next(error)
    }
}

// 用户注册
exports.register = async (req, res, next) => {
    try {
        // 1.获取请求体数据
        console.log(req.body)
        // 2.数据验证
        // 2.1 基本数据验证 -- 例如判断用户名,密码是否符合规范
        // 2.2 业务数据验证 -- 例如 用户是否已经存在

        // 3. 验证通过,将数据保存到数据库中  拿到请求体中的user对象
        let user = new User(req.body.user)

        // 保存到数据库 因为时异步操作 所以加await修饰符
        await user.save()

        // 移除user对象中的password字段 不让返回到前端
        // delete user.password  你会这个方法删除不了 因为这是monggo生成的数据 不能用delete删除 
        user = user.toJSON() //需要先把数据用json处理后 才能删除
        delete user.password
        //4.发送成功响应 设置status状态码201 并json处理user响应给客户端
        res.status(201).json({
            user
        })
    } catch (error) {
        // next() 流转错误处理到错误处理中间件
        next(error)
    }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        // 这里能拿到的req.user 已经在上一个auth中 生成好了 只需要用json方式响应给客户端对应格式就好
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        // next() 流转错误处理到错误处理中间件
        next(error)
    }
}

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        // 处理请求
        res.send('put 更新当前用户 ')
    } catch (error) {
        // next() 流转错误处理到错误处理中间件
        next(error)
    }
}