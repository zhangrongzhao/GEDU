var Patterns = Patterns || {};

/**
 * 返回指定的命名空间，如果命名空间不存在则创建命名空间。
 * 备注：命名时需小心，注意保留关键字，可能在一些浏览器无法使用。
 *
 * @method namespace
 * @param {String *} 至少需要创建一个命名空间
 * @return {Object} 最后一个命名空间创建的对象的引用
 */
Patterns.namespace = function(str){
    var parts = str.split("."),
        parent = Patterns,
        i=0,
        l=0;

    if(parts[0]==="Patterns"){
        parts = parts.slice(1);
    }
    for(i=0,l=parts.length; i<l;i++){
        if(typeof parent[parts[i]] === "undefined"){
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}

Patterns.namespace("Classic.Composite").Node = (function () {
    function _Node() { this.children = []; }
    _Node.prototype = {
        add: function (child) {this.children.push(child); },
        remove: function (child) {
            var length = this.children.length;
            for (var i = 0; i < length; i++){
                if (this.children[i] === child) {
                    this.children.splice(i, 1);
                    return;
                }
            }
        },
        getChild: function (i) { return this.children[i]; },
        hasChild: function () { return this.children.length > 0; }
    };
    return _Node;
})();



