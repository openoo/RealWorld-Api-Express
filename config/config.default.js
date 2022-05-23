/**
 *  默认配置
 */

// 使用commonJs规范 导出默认配置
module.exports = {
    // 配置mongoDB连接地址
    dbUri: 'mongodb://localhost:27017/realworld',
    jwtSecret: '我是jwt的加密验证密钥', // 也可以使用uuid 确保key的唯一性 
}