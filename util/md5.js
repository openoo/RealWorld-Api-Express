// 加载nodejs原生模块 crypto 直译 密码学
const crypto = require('crypto')


module.exports = str => {
    return crypto.createHash('md5') //返回出 调用crypto中的md5散列算法 对密码加密处理
        .update(str) // 传入你要md5的字符串
        // .update('hunxiao' + str) // 传入你要md5的字符串  *** 前面也可以加入混淆字符串 防止暴力破解
        .digest('hex') // 转化为10进制
}


// 获取 crypto 支持的散列算法
// console.log(crypto.getHashes())
// 如何运行   node .\util\md5.js  直接node运行它打印
// [
//     'RSA-MD4',
//     'RSA-MD5',
//     'RSA-MDC2',
//     'RSA-RIPEMD160',
//     'RSA-SHA1',
//     'RSA-SHA1-2',
//     'RSA-SHA224',
//     'RSA-SHA256',
//     'RSA-SHA3-224',
//     'RSA-SHA3-256',
//     'RSA-SHA3-384',
//     'RSA-SHA3-512',
//     'RSA-SHA384',
//     'RSA-SHA512',
//     'RSA-SHA512/224',
//     'RSA-SHA512/256',
//     'RSA-SM3',
//     'blake2b512',
//     'blake2s256',
//     'id-rsassa-pkcs1-v1_5-with-sha3-224',
//     'id-rsassa-pkcs1-v1_5-with-sha3-256',
//     'id-rsassa-pkcs1-v1_5-with-sha3-384',
//     'id-rsassa-pkcs1-v1_5-with-sha3-512',
//     'md4',
//     'md4WithRSAEncryption',
//     'md5',
//     'md5-sha1',
//     'md5WithRSAEncryption',
//     'mdc2',
//     'mdc2WithRSA',
//     'ripemd',
//     'ripemd160',
//     'ripemd160WithRSA',
//     'rmd160',
//     'sha1',
//     'sha1WithRSAEncryption',
//     'sha224',
//     'sha224WithRSAEncryption',
//     'sha256',
//     'sha256WithRSAEncryption',
//     'sha3-224',
//     'sha3-256',
//     'sha3-384',
//     'sha3-512',
//     'sha384',
//     'sha384WithRSAEncryption',
//     'sha512',
//     'sha512-224',
//     'sha512-224WithRSAEncryption',
//     'sha512-256',
//     'sha512-256WithRSAEncryption',
//     'sha512WithRSAEncryption',
//     'shake128',
//     'shake256',
//     'sm3',
//     'sm3WithRSAEncryption',
//     'ssl3-md5',
//     'ssl3-sha1',
//     'whirlpool'
//   ]