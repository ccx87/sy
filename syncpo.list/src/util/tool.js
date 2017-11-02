import { GET_REGEX_MATCH } from './locaData'

export const Tool = {};
export const Dom = {};

//url参数拼接
Tool.paramType = data => {
    let paramArr = []; 
    let paramStr = ''; 
    for (let attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    paramStr = '?' + paramStr;
    return paramStr
}
//深度克隆
Tool.cloneObj = obj => {
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //序列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? module.exports.cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
}
//正则
Tool.regexBoolean = (value, rule) => {
    switch(rule){
        case GET_REGEX_MATCH.only_letter:
           return !!value.match(/^[a-zA-Z]{1}$/)

        case GET_REGEX_MATCH.mobile: 
           return !!value.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)

        case GET_REGEX_MATCH.email:
           return !!value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,})+$/)

        case GET_REGEX_MATCH.password_six:
           return !!value.match(/^[\w]{6,16}$/)
        
        case GET_REGEX_MATCH.integer_greater_0:
           return !!value.match(/^\+?[1-9]\d*$/)
           
        case GET_REGEX_MATCH.is_image:
           //基本判断是否是图片类型，如有更好的选择就修改掉。
           return /\.(png|PNG|jpe?g|JPE?G|gif|GIF)$/.test(value)

        case GET_REGEX_MATCH.last_suffix:
           return !!value.match(/\.(\w+)$/)

        default:
           return false             
    }    
}
//去前后空格
Tool.trim = str => { 
  if( !str ) return str;
  return str.replace(/(^\s*)|(\s*$)/g, "") 
}
//编码
Tool.encodeURI = text => {
    return encodeURI(text)
}