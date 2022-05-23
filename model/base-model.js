/**
 * 基础数据模型
 */

module.exports = {
    createdAt: { // 创建时间
        type: String, // 时间类型
        default: Date.now // 默认时间 创建时由 Date.now 自动生成  获取时间戳 若想数据库中以时间戳的形式存在 则type: String 定义为字符串类型
    },
    updatedAt: { // 更新时间
        type: Date, // 时间类型
        default: Date.now // 默认时间 创建时由 Date.now 自动生成
    }
}