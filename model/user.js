// 加载monggoose
const mongoose = require('mongoose')

// 加载基础数据模型
const baseModel = require('./base-model')

// 加载自定义的md5加密模块
const md5 = require('../util/md5')

//  创建userSchema 模型
const userSchema = new mongoose.Schema({
    ...baseModel, //把基础数据模型混入到当前数据架构中  
    username: {
        type: String, // 字符串类型
        required: true // 该字段是必须的
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value), // 对password赋值时 会先经过定义的md5方法 加密
        select: false // 默认在查询数据时 就不会将该字段返回
    },
    bio: { // 用户个人介绍
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
});

module.exports = userSchema