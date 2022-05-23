const validate = require('../middleware/validate')

const { body, param } = require('express-validator')
// 加载mongoose 会用到mongoose.isValidObjectId()方法 验证param
const mongoose = require('mongoose')

const { Article } = require('../model')

// 简单校验创建文章的相关内容是否为空
exports.createdArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'), // isEmpty() 表示为空过验证  notEmpty() 表示非空过验证
    body('article.body').notEmpty().withMessage('文章内容不能为空'),
    body('article.description').notEmpty().withMessage('文章描述不能为空'),

])

// 校验获取文章id的param值 是否符合mongodb的规范
exports.getArticle = validate([  //这里可以写成和updateArticle一样  但为了加强后面复习理解 就留下了
    // 同步写法 
    // param('articleId').custom((value) => { // 这里要用param 获取到参数 用custom() 自定义校验规则
    //     if (!mongoose.isValidObjectId(value)) { // mongoose.isValidObjectId(value)  返回值是布尔值 检测id是否符合mongo特征
    //         // return Promise.reject('文章Id类型错误') // 不能这么写 没有指定这是一个promise 实例 ,这是一个同步函数
    //         // 应该用 throw new Error() 来抛出错误
    //         // 同步 :失败
    //         throw new Error('文章ID类型错误')
    //     }
    //     // 同步: 成功
    //     return true
    // })

    // 异步写法  用async修饰它是一个异步函数 这样他就是一个promise函数了
    param('articleId').custom(async (value) => {
        if (!mongoose.isValidObjectId(value)) {
            return Promise.reject('文章ID类型错误')
        }
    })
])

// 更新文章时候的校验
// 校验更新文章id是否合规 --- 这里只是初步验证  文章id 是否正确
// 校验文章是否存在
// 校验修改文章的作者是否是当前登录用户
exports.updateArticle = [
    // 校验更新文章id是否合规
    validate([
        validate.isValidObjectId(['params'], 'articleId') // 对应validate中间件中(location, fields)
    ]),
    // 校验文章是否存在
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        req.article = article // 把查询的作者挂载到req 供后续比对使用
        !article
            ? res.status(404).end('文章不存在')
            : next()
    },
    // 校验修改文章的作者是否是当前登录用户
    async (req, res, next) => {
        console.log(req.user._id, req.article.author)
        // 这里比对的时候需要都强制转换为字符串比对  不然前端传来的 和数据库查到的 他们类型不一样 
        req.user._id.toString() !== req.article.author.toString() // 值得注意:能执行到这里说明已经完成了auth(jwt)认证 这步已经在req上挂载了user对象
            ? res.status(403).end('拒绝访问')
            : next()
    }


]


// 删除文章时的校验 
// 仔细想想它需要的逻辑和更新文章时候要的逻辑一样 我们就可以像下面这么写
exports.deleteArticle = exports.updateArticle