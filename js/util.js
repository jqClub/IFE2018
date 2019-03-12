//通用套路函数
var log = console.log.bind(console)
//查找元素
var e = function(sel) {
    return document.querySelector(sel)
}
//批量查找元素
var es = function(elements) {
    return document.querySelectorAll(elements)
}
//监听事件函数
var bindEvent = function(element, event, callback) {
    element.addEventListener(event, callback)
}
//给多个元素绑定事件
var bindEventAll = function(elements, event, callback) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i]
        element.addEventListener(event, callback)
    }
}
//插入html文件
var insertContent = function(sel, html) {
    sel.insertAdjacentHTML('beforeend', html)
}
