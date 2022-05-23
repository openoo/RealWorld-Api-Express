/**
 * 验证token 验证身份 中间件
 */
// 加载jwt 用于验证客户端传回的token是否有效
const jwt = require('../util/jwt')
// 加载默认配置 用于得到密钥
const { jwtSecret } = require('../config/config.default')
// 加载数据库模块
const { User } = require('../model')
// 加载自定义的错误处理中间件
// const errorHandler = require('../middleware/error-handler')

module.exports = async (req, res, next) => {
    // 从请求头获取 token 数据 ->一般存在请求头Authorization中
    let token = req.headers.authorization
    // 3元判断能否取到token
    token = token  // 判断token是否拿到 若拿不到就表示authorization没有
        ? token.split('Bearer ')[1] //split()方法分割
        : null // 拿不到就直接赋值token null

    if (!token) return res.status(401).end('token验证失败') // 如果没有token 直接响应401并结束响应
    // if (!token) errorHandler() // 如果没有token  方式2 统一错误处理 但需加载自定义的错误处理中间件
    // 验证token
    try {
        // 用jwt 解出 token里面的对象
        const decodeToken = await jwt.verify(token, jwtSecret)
        // findById方法 查询 token里面的userId 这样查询的结果是不包含password字段的 因为数据模型中有指定 select: false
        req.user = await User.findById(decodeToken.userId) // 赋值给req身上 供后续中间件使用
        next()
    } catch (error) {
        // return res.status(401).end()
        next(error) // 统一错误处理
    }
}