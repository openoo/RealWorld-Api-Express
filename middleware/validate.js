// 加载
// validationResult, buildCheckFunction 这是下面两个中间需要用到的函数 它是express-validator封装的
const { validationResult, buildCheckFunction } = require('express-validator')

const mongoose = require('mongoose')

// 注意" exports = " 是后面添加的 因为代码写到后面 发现增加的需求 为了不改动其他应用该模块的地方不修改代码 让这个函数重新指向exports  此时validations就是这个exports
// 这里后面写的函数就包裹进了validations中 后面调用 就可以直接 validations.isValidObjectId 你体会体会  
exports = module.exports = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

// 这是难点 -- 意思是 
// 原本的express-validator中是没有isValidObjectId()(检验是否为合格mongoDB的id值) 这个方法的
// 但是mongoose中有isValidObjectId(value)这个方法 所以上方加载了mongoose
// 我们可以通过express-validator中buildCheckFunction方法来嫁接这个方法到 validate中间件 方便其他调用这个中间件的模块使用
exports.isValidObjectId = (location, fields) => {  // 创建check()的变体，用于检查给定的请求位置。 地址:https://express-validator.github.io/docs/check-api.html#buildcheckfunctionlocations
    return buildCheckFunction(location)(fields).custom( //location可以包括Body、Cookie、Header、Params或Query中的任何一个  fields是需要验证的数据字段
        async value => { //async 修饰为异步的promise函数 后面可以用Promise.reject改变函数状态
            if (!mongoose.isValidObjectId(value)) {
                return Promise.reject('ID 不是有效的')
            }
        }
    )
}