/**
 * Created by Administrator on 2017/5/25.
 */
var Patterns = Patterns || {};

/**
 * 返回指定的命名空间，如果命名空间不存在则创建命名空间。
 * 备注：命名时需小心，注意保留关键字，可能在一些浏览器无法使用。
 *
 * @method namespace
 * @param
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

Patterns.namespace("Classic.Adapter").Shipping = (function () {
    var _Shipping = function () { };
    _Shipping.prototype.request = function (zipStart, zipEnd, weight) { return "$49.75"; };
    return _Shipping;
})();

Patterns.namespace("Classic.Adapter").AdvancedShipping = (function(){
    var _AdvancedShipping = function () { };
    _AdvancedShipping.prototype.login = function (credentials) { };
    _AdvancedShipping.prototype.setStart = function (start) { };
    _AdvancedShipping.prototype.setDestination = function (destination) { };
    _AdvancedShipping.prototype.calculate = function (weight) { return "$39.50"; };
    return _AdvancedShipping;
})();

Patterns.namespace("Classic.Adapter").ShippingAdapter = (function () {
    var shipping = new Patterns.Classic.Adapter.AdvancedShipping();
    function _ShippingAdapter(credentials) {
        shipping.login(credentials);
    }
    _ShippingAdapter.prototype.request = function (zipStart, zipEnd, weight) {
        shipping.setStart(zipStart);
        shipping.setDestination(zipEnd);
        return shipping.calculate(weight);
    }
    return _ShippingAdapter;
})();

function run() {
    var shipping = new Patterns.Classic.Adapter.Shipping();
    var credentials = { token: "30a8-6ee1" };
    var adapter = new Patterns.Classic.Adapter.ShippingAdapter(credentials);
    var cost = shipping.request("78701", "10010", "2 1bs");
    console.log("Old cost:" + cost);
    cost = adapter.request("78701", "10010", "2 1bs");
    console.log("New cost:"+cost);
}

var button = document.createElement('button');
button.textContent = "Abstract Factory";
button.onclick = function () { run(); };
document.body.appendChild(button);
