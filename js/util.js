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


//新增打印函数，可以在页面中显示打印信息
var printText = function() {
     var result = ''
    // console.log(arguments)
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(value){
        // console.log(value)
        if(typeof value == 'object') {
            value = JSON.stringify(value)
        }
        result += value + ' '
    });
    console.log(result)
    e('#id-text-log').value += result + '\n'
}

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}