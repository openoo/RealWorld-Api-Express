/*
    *项目的入口文件
*/

// 加载express
const express = require('express')
// 加载日志输出模块                        *** 加载前需要 npm i morgan 
const morgan = require('morgan')
// 加载cros -- 为客户端提供跨域资源请求     ***加载前需要 npm i cors
const cors = require('cors')
// 加载自定义的路由  *** 默认导入目录下的index文件 所以可以不写index
const router = require('./router')
// 加载自定义的错误处理中间件
const errorHandler = require('./middleware/error-handler')

require('./model')
// 创建express应用
const app = new express()

// 定义端口号 process.env.PORT: 先通过环境变量读取默认端口号
const PORT = process.env.PORT || 3000


// 配置中间件 *** 使用app.use()的都是中间件

// 使用日志输出中间件 -> 把输出模式调成dev开发模式    *** 此配置项可以越靠前为好--捕获更多日志信息
app.use(morgan('dev'))

// 解析请求体
app.use(express.json())

// 挂载cros中间件  *** 挂载后响应头会多出一个配置项 {Access-Control-Allow-Origin: *} 表示客户端都可以请求 
app.use(cors())


// 挂载路由 -- 使用应用中间件的方式 
// 指定路由前缀: /api
app.use('/api', router)


//挂载统一处理的服务端处理中间件 就是next() 流转过来的错误  
app.use(errorHandler())


// 监听端口
app.listen(PORT, () => {
    console.log(`服务器运行地址:http://localhost:${PORT}`)
})