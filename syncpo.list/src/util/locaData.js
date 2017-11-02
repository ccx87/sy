/**
 * 数据常量类
 * @type {Object}
 */
module.exports = {
    /**
     * ipnut框模式
     */
    INPUT_MODE: {
        login: 1,
        registered: 2,
        forgetPassword: 3,
        updatePassword: 4
    },
    /**
     * 获取正则表达式
     */    
    GET_REGEX_MATCH: {
        only_letter: 'ONLY_LETTER',//一位字符
        mobile: 'MOBILE', //手机
        email: 'EMAIL', //邮箱
        password_six: 'PASSWORD_SIX', //密码6位
        integer_greater_0: 'INTEGER_GREATER_0', //大于0的整数
        is_image: 'IS_IMAGE', //是否是图片格式 
        last_suffix: 'LAST_SUFFIX' //最后一个后缀名 
    }, 
}