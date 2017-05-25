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

/*output device*/
Patterns.namespace("Patterns.Bridge").Screen = (function () {
    function _Screen() { }
    _Screen.prototype.click = function () { console.log("Screen select"); }
    _Screen.prototype.move = function () { console.log("Screen move"); }
    _Screen.prototype.drag = function () { console.log("Screen drag"); }
    _Screen.prototype.zoom = function () { console.log("Screen zoom in"); }
    return _Screen;
})();

Patterns.namespace("Patterns.Bridge").Audio = (function () {
    function _Audio() { }
    _Audio.prototype.click = function () { console.log("Sound oink"); }
    _Audio.prototype.move = function () { console.log("Sound waves"); }
    _Audio.prototype.drag = function () { console.log("Sound screetch");}
    _Audio.prototype.zoom = function () { console.log("Sound volume up");}
    return _Audio;
})();

/*input device*/
Patterns.namespace("Patterns.Bridge").Gestures = (function () {
    function _Gestures(output) {
        this.output = output;
    }
    _Gestures.prototype.tap = function () { this.output.click(); }
    _Gestures.prototype.swipe = function () { this.output.move(); }
    _Gestures.prototype.pan = function () { this.output.drag(); }
    _Gestures.prototype.pinch = function () { this.output.zoom(); }
    return _Gestures;
})();

Patterns.namespace("Patterns.Bridge").Mouse = (function () {
    function _Mouse(output) { this.output = output; }
    _Mouse.prototype.click = function () { this.output.click(); }
    _Mouse.prototype.move = function () { this.output.move(); }
    _Mouse.prototype.down = function () { this.output.drag(); }
    _Mouse.prototype.wheel = function () { this.output.zoom(); }
    return _Mouse;
})();

function run() {
    var screen = new Patterns.Bridge.Screen();
    var audio = new Patterns.Bridge.Audio();

    var hand = new Patterns.Bridge.Gestures(screen);
    var mouse = new Patterns.Bridge.Mouse(audio);

    hand.tap();
    hand.swipe();
    hand.pan();
    hand.pinch();

    mouse.click();
    mouse.move();
    mouse.down();
    mouse.wheel();
}

var button = document.createElement('button');
button.textContent = "Abstract Factory";
button.onclick = function () { run(); };
document.body.appendChild(button);
