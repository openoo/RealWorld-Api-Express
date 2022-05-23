/**
 * 入口文件在引入这个错误处理中间件时, 定义成了一个函数 errorHandler
 * 我们这里就要导出一个函数
 */
// 引入工具模块 后续让它去格式化错误信息
const util = require('util')

module.exports = () => {
    // **** 错误处理中间件必须要指定这4个参数:err, req, res, next
    return (err, req, res, next) => {
        res.status(500).json({  //res.status(500) 响应体设置status状态码为500 并且json处理返回错误信息给客户端
            // error: err  // 直接输出err 会为空 可以使用下方util工具模块中的format方法 处理下err错误信息
            error: util.format(err)  // 仅仅针对开发过程 方便观察错误
        })
    }
}