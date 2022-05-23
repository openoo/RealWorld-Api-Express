// 加载monggoose
const mongoose = require('mongoose')

// 加载基础数据模型
const baseModel = require('./base-model')


//  articleSchema 模型
const articleSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String, // 字符串类型
        required: true // 该字段是必须的
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tagList: { // 标签 有多个
        type: [String], // 该字段是数组 里面是一个个字符串
        default: null
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: { //作者
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // 也是必须项
    }
});

module.exports = articleSchema