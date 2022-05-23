// 加载validate中间件
const validate = require('../middleware/validate')
// 加载 数据验证 express-validator是一个第三方的数据验证模块 文档地址:https://express-validator.github.io/docs/index.html
const { body } = require('express-validator');
// 加载数据库模块   用于后面字段的查重验证
const { User } = require('../model')
const md5 = require('../util/md5')


exports.register = validate([
    body('user.username')
        .notEmpty().withMessage('用户名不能为空')// notEmpty()是由express-validator中间件提供的方法 表示该字段不能为空
        .bail()//如果前面的任何验证失败，则停止运行验证。
        .custom(
            async username => { // async 表示验证邮箱时 Promise 对象
                const user = await User.findOne({ username }) // 传入email字段 通过数据库查找email异步方法
                if (user) { // 当用户/邮箱存在时
                    return Promise.reject('用户名已经存在') // 改变当前Promise实例的状态为rejectd 返回 '邮箱已经存在
                }
            }
        )
    ,
    body('user.email')
        .notEmpty().withMessage('邮箱不能为空')//withMessage() 可以自定义错误消息 不然默认输出的英文错误信息
        .isEmail().withMessage('邮箱格式不正确')
        .bail() //如果前面的任何验证失败，则停止运行验证。 比如邮箱格式都不正确时 就中断验证 不要在验证数据库 优化数据库压力
        .custom( // 添加自定义验证
            async email => { // async 表示验证邮箱时 Promise 对象
                const user = await User.findOne({ email }) // 传入email字段 通过数据库查找email异步方法
                if (user) { // 当用户存在时
                    return Promise.reject('邮箱已经存在') // 改变当前Promise实例的状态为rejectd 返回 '邮箱已经存在
                }
            }
        )
    ,
    body('user.password').notEmpty().withMessage('密码不能为空')
])

// 登录验证中间函数 : 首先login被定义成了数组 ,里面写了多个validate([])验证 原因里面的数据需要经过多次校验
// 第1次校验: 验证邮箱与密码 是否为空 为空时就中断验证 减少服务器的压力
// 第2次校验: 用户输入的邮箱/密码没问题 邮箱拿到数据库中比对
//           1. 使用了custom()自定义验证规则 对异步操作用async await修饰
//           2. custom()中的参数,1个是用户输入的email 2个是解构了请求头上的req(因为req是公有的 便于数据库查询到的值暴露到这个req上 供后续的中间件不用二次查询就能拿到值)
//           3. 用select()指定必须要返回的值 *** 不指定是不返回的 
//           4. 判断用户是否存在 不存在调用Promise.reject() 中断验证; 存在,则把查到的值暴露给req中的user 供后续中间件使用
// 第3次校验: 解构拿到请求体中的req(此时的req已经被第2次校验的值替换了 里面有数据库中的账号密码等信息) 比对用户当前输入的密码 与 数据中查到的密码
exports.login = [
    validate([
        body('user.email').notEmpty().withMessage('邮箱不能为空'),
        body('user.password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('user.email').custom(async (email, { req }) => {
            const user = await User.findOne({ email }).select(['email', 'username', 'bio', 'image', 'password'])
            if (!user) {
                return Promise.reject('用户不存在')
            }
            // 将查询到的数据挂载到请求对象中,供后续的验证规则使用
            req.user = user
        })
    ]),
    validate([
        body('user.password').custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) return Promise.reject('密码错误')
            // console.log(req.user)
        })
    ])
]