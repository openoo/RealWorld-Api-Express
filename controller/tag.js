// 文章标签
exports.getTags = async (req, res, next) => {
    try {
        res.send('get 文章标签')
    } catch (error) {
        next(error)
    }
}
