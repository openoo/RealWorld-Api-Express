const mongoose = require('mongoose');
// 从配置文件中引入mongoDB的连接地址
const { dbUri } = require('../config/config.default')
// 链接 MongoDB 数据库 数据库名:realworld
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// 开始连接 得到 db
const db = mongoose.connection;

// 当连接失败的时候
db.on('error', (err) => {
    console.log('MongoDB 数据库连接失败', err)
});

// 当连接成功的时候
db.once('open', function () {
    // we're connected!
    console.log('MongoDB 数据库连接成功')
});



// 组织导出模型类 (构造函数)

module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article'))
}


















// mongoose基本操作
// 创建了一个模型Cat
// const Cat = mongoose.model('Cat', { name: String });

// // 根据模型Cat 创建了一个kitty对象
// const kitty = new Cat({ name: 'Zildjian' });

// // 当数据写入数据库成功时 输出meow
// kitty.save().then(() => console.log('meow'));