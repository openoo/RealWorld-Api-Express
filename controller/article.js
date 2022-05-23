// 从article.js中抽离的函数处理部分
const { Article, User } = require('../model')

// 获取文章列表
exports.getListArticles = async (req, res, next) => {
    try {
        const {
            limit = 20,
            offset = 0,
            tag,
            author
        } = req.query // 解构对应取出url后的查询参数query 并给定默认值(解决前端不传参数的时候如何响应)

        const filter = {} // 首先定义查询条件为一个空对象
        if (tag) filter.tagList = tag //当tag存在时 把他保存到 filter中 包含关系 不是赋值完成等于

        if (author) {
            // console.log(author)  
            // 通过User数据库查找到指定作者的信息  *** 注意回调函数用async修饰了 函数体类所有的异步任务 全部都要用await修饰 不然执行会出问题
            const user = await User.findOne({ username: author })
            // 那种作者的id值 赋值给author   因为Article合集里面 每条数据都保存对应作者的id值 用三元判断查到的user是否存在 不存在赋值为空对象
            filter.author = user ? user._id : null

        }
        const articles = await Article.find(filter) // 把查询条件filter传给find()方法
            .skip(Number.parseInt(offset)) // 跳过多少条 不是把数据查出来才做限制 而是请求到数据库的时候 就已经对结果集进行限制了
            .limit(+limit) // 取多少条 这里需要把query参数转成数字类型 不然把字符串带进skip(),limit()方法中 会报错
            .sort({ // 指定排序顺序
                createdAt: -1 //-1 表示倒叙排  1 正序  createdAt是数据库中创建时间的字段
            })
        const articlesCount = await Article.countDocuments() // 获取所有文章总数
        res.status(200).json({
            articles,
            articlesCount
        })
    } catch (error) {
        next(error)
    }
}

// 获取文章摘要
exports.getFeedArticles = async (req, res, next) => {
    try {
        //
        res.send('get 获取文章摘要')
    } catch (error) {
        next(error)
    }
}

// 获取指定文章
exports.getArticle = async (req, res, next) => {
    try {
        // 通过请求体的路径参数 获取要查询的文章id
        // 用 Article模型的findById()来查询对应的文章 映射author 查询是时候不用加execPopulate()
        const article = await Article.findById(req.params.articleId).populate('author')
        !article ? res.status(404).end('文章不存在') : res.status(200).json({ article })
    } catch (error) {
        next(error)
    }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
    try {
        //处理文章创建请求  --- 执行到这里表示已经完成了jwt认证, 字段要求认证
        const article = new Article(req.body.article) // 通过引入Article 创建article实例对象 数据部分来自于 请求头中
        article.author = req.user._id // 这里拿到的req.user._id 是用户认证中间件 暴露的
        article.populate('author').execPopulate() // 这里是根据jwt中存在的id 去映射作者id 对应的数据  这里并没有写死赋值 只是映射关系 因为作者的个人信息随时会改变 不能写实  其实只是在mongodb中建立了映射关系
        await article.save() // 保存到数据库是异步操作 用 await修饰下
        res.status(201).json({ // 响应状态码设置为201 响应数据就是刚才创建的article实例对象
            article: article
        })
    } catch (error) {
        next(error)
    }
}

// 更新文章 Update Article
exports.updateArticle = async (req, res, next) => {
    try {
        const article = req.article //  这是数据库库中的原有数据 是前面的中间件挂载的
        const bodyArticle = req.body.article // 这是请求体中携带的article
        article.title = bodyArticle.title || article.title
        article.description = bodyArticle.description || article.description
        article.body = bodyArticle.body || article.body
        await article.save()
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 删除指定文章
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article //  这是数据库库中的原有数据 是前面的中间件挂载的 它是一个mongoDB时实例对象
        await article.remove() // 这个实例对象上有remove方法 可以删除这个实例
        res.status(204).end('删除成功')

    } catch (error) {
        next(error)
    }
}

// 向文章添加评论
exports.addComments = async (req, res, next) => {
    try {
        //
        res.send('post 向文章添加评论')
    } catch (error) {
        next(error)
    }
}


// 获取文章评论
exports.getComments = async (req, res, next) => {
    try {
        //
        res.send('get 获取文章评论')
    } catch (error) {
        next(error)
    }
}


// 删除文章评论
exports.deleteComments = async (req, res, next) => {
    try {
        //
        res.send('delete 删除文章评论')
    } catch (error) {
        next(error)
    }
}

// 收藏文章
exports.favoriteArticle = async (req, res, next) => {
    try {
        //
        res.send('post 收藏文章')
    } catch (error) {
        next(error)
    }
}

// 取消收藏文章
exports.unfavoriteArticle = async (req, res, next) => {
    try {
        //
        res.send('delete 取消收藏文章')
    } catch (error) {
        next(error)
    }
}
