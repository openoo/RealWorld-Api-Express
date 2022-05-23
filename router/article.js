/**
 * 文章子路由
 */
const express = require('express')

const articleCtrl = require('../controller/article')

const router = express.Router()

const auth = require('../middleware/auth')

const articleValidator = require('../validator/article')

// 获取文章列表
router.get('/articles', articleCtrl.getListArticles)

// 获取文章摘要
router.get('/articles/feed', auth, articleCtrl.getFeedArticles)

// 获取指定文章
router.get('/articles/:articleId', articleValidator.getArticle, articleCtrl.getArticle)

// 创建文章
router.post('/articles', auth, articleValidator.createdArticle, articleCtrl.createArticle)

// 更新文章 Update Article
router.put('/articles/:articleId', auth, articleValidator.updateArticle, articleCtrl.updateArticle)

// 删除指定文章
router.delete('/articles/:articleId', auth, articleValidator.deleteArticle, articleCtrl.deleteArticle)

// 向文章添加评论
router.post('/articles/:articleId/comments', auth, articleCtrl.addComments)

// 获取文章评论
router.get('/articles/:articleId/comments', articleCtrl.getComments)

// 删除文章评论
router.delete('/articles/:articleId/comments/:id', auth, articleCtrl.deleteComments)


// 收藏文章
router.post('/articles/:articleId/favorite', auth, articleCtrl.favoriteArticle)

// 取消收藏文章
router.delete('/articles/:articleId/favorite', auth, articleCtrl.unfavoriteArticle)



module.exports = router