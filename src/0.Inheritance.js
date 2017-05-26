var Patterns = Patterns || {};
var __extends = (this && this.__extends) || function (subType, superType) {
        for (var p in superType) {
            if (superType.hasOwnProperty(p)) {
                subType[p] = superType[p];
            }
        }
        function __() { this.constructor = subType; }
        subType.prototype = superType === null ? Object.create(superType) : (__.prototype=superType.prototype,new __());
    };

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

Patterns.namespace("Patterns.OO.Inheritance.Demo").Animal = (function () {
    function _Animal(name) { this.name = name; }
    _Animal.prototype = {
        move: function (distanceInMeters) {
            if (distanceInMeters === void 0) {
                distanceInMeters = 0;
            }
            console.log(this.name+" moved "+distanceInMeters+"m.");
        }
    }
    return _Animal;
})();

Patterns.namespace("Patterns.OO.Inheritance.Demo").Snake = (function (_super) {
    function _Snake(name) {return  _super.call(this,name)||this;}
    __extends(_Snake, _super);
    _Snake.prototype = {
        move: function (distanceInMeters) {
            if (distanceInMeters === void 0) {
                distanceInMeters = 5;
            }
            console.log("Slithering...");
            _super.prototype.move.call(this, distanceInMeters);
        }
    };
    return _Snake;
})(Patterns.OO.Inheritance.Demo.Animal);

Patterns.namespace("Patterns.OO.Inheritance.Demo").Horse = (function (_super) {
    function _Horse(name) { return _super.call(this, name) || this; }
    _Horse.prototype = {
        move: function (distanceInMeters) {
            if (distanceInMeters === void 0) {
                distanceInMeters = 45;
            }
            console.log("Galloping");
            _super.prototype.move.call(this,distanceInMeters);
        }
    };
    return _Horse;
})(Patterns.OO.Inheritance.Demo.Animal);


function run() {
    var sam = new Patterns.OO.Inheritance.Demo.Snake("Sammy the Python");
    var tom = new Patterns.OO.Inheritance.Demo.Horse("Tommy the Palomino");
    sam.move();
    tom.move();
}

var button = document.createElement('button');
button.textContent = "Abstract Factory";
button.onclick = function () { run(); };
document.body.appendChild(button);