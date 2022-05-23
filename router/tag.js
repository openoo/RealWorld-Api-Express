/**
 * 标签子路由
 */

const express = require('express')

const tagCtrl = require('../controller/tag')
const router = express.Router()


// 文章标签
router.get('/tags', tagCtrl.getTags)

module.exports = router
