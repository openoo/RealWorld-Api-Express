// 获取用户资料
exports.getProfile = async (req, res, next) => {
    try {
        // 处理请求
        res.send('get 获取用户资料')
    } catch (error) {
        next(error)
    }
}


// 关注用户
exports.followUser = async (req, res, next) => {
    try {
        // 处理请求
        res.send('post 关注用户')
    } catch (error) {
        next(error)
    }
}


// 取消关注用户
exports.unfollowUser = async (req, res, next) => {
    try {
        // 处理请求
        res.send('delete 取消关注用户')
    } catch (error) {
        next(error)
    }
}
