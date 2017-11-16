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
    SWITCH_TAB: [
        {text: '会员登录', name: 'signIn', path: '/signIn'},
        {text: '注册', name: 'signUp', path: '/signUp'}
    ],
    SWITCH_TAB2: [
        {text: '忘记密码', name: 'forgetPw', path: '/forgetPw'}
    ],
    SLIDEBAR_MENU: [
        {text: '列表', name: 'list', path: '/list'},
        {text: '滑动菜单', name: 'nav', path: '/nav'}
    ],
    SCROLL_NAV: [
        {text: '首页', name: 'page1', path: '/page1'},
        {text: '简介', name: 'page2', path: '/page2'},
        {text: '我们', name: 'page3', path: '/page3'},
        {text: '关于', name: 'page4', path: '/page4'},
        {text: '反馈', name: 'page5', path: '/page5'},
        {text: '建议', name: 'page6', path: '/page6'},
        {text: '留言', name: 'page7', path: '/page7'}       
    ]   
}