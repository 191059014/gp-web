/**
 * 设置cookie信息
 * @param {cookie的key} key 
 * @param {cookie的value} value 
 * @param {cookie过期时间} expire 
 */
export function setCookie(key, value, expire) {
    var date = new Date()
    date.setSeconds(date.getSeconds() + expire)
    document.cookie = key + "=" + escape(value) + "; expires=" + date.toGMTString()
    //console.log(document.cookie)
}

/**
 * 获取cookie信息
 * @param {cookie的key} key 
 */
export function getCookie(key) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(key + "=")
        if (c_start != -1) {
            c_start = c_start + key.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

/**
 * 删除cookie信息
 * @param {cookie的key} key 
 */
export function delCookie(key) {
    setCookie(key, "", -1)
}
