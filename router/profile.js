/**
 * 对用户的相关操作  关注用户/取消关注用户
 */

const express = require('express')

const profileCtrl = require('../controller/profile')

const router = express.Router()

const auth = require('../middleware/auth')


// 获取用户资料
router.get('/profiles/:username', profileCtrl.getProfile)

// 关注用户
router.post('/profiles/:username/follow', auth, profileCtrl.followUser)

// 取消关注用户
router.delete('/profiles/:username/follow', auth, profileCtrl.unfollowUser)

module.exports = router