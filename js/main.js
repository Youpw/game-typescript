var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Events = (function () {
    function Events() {
    }
    Events.on = function (eventName, fn) {
        Events.topics[eventName] = Events.topics[eventName] || [];
        Events.topics[eventName].push(fn);
    };
    Events.off = function (eventName, fn) {
        if (this.topics[eventName]) {
            for (var i = 0; i < this.topics[eventName].length; i++) {
                if (this.topics[eventName][i] === fn) {
                    this.topics[eventName].splice(i, 1);
                    break;
                }
            }
            ;
        }
    };
    Events.trigger = function (eventName, data) {
        if (Events.topics[eventName]) {
            Events.topics[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    };
    Events.topics = {};
    return Events;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this._element = document.getElementById('container');
        this._w = window.innerWidth;
        this._h = window.innerHeight;
        this.keyDownHandler = function (e) {
            if (e.keyCode === 38) {
                if (_this._player.yPos >= -700) {
                    _this._player.moveUp(10);
                    _this.update();
                }
                else {
                    console.log("border reached -y");
                }
            }
            if (e.keyCode === 40) {
                if (_this._player.yPos <= _this._h) {
                    _this._player.moveDown(10);
                    _this.update();
                }
                else {
                    console.log("border reached +y");
                }
            }
            if (e.keyCode === 37) {
                if (_this._player.xPos >= 0) {
                    _this._player.moveLeft(10);
                    _this.update();
                }
                else {
                    console.log("border reached -x");
                }
            }
            if (e.keyCode === 39) {
                if (_this._player.xPos <= 500) {
                    _this._player.moveRight(10);
                    _this.update();
                }
                else {
                    console.log("border reached +x");
                }
            }
        };
        this._player = new Mouse('rocketship');
        this._rock = new Rock('rock', 0);
        document.addEventListener('keydown', this.keyDownHandler);
        this._w -= 10;
        this._h -= 10;
        this.draw();
        this.moveDown();
        var gameInformation = document.createElement('div');
        gameInformation.className = 'gameInformation';
        this._scoreboard = new Scoreboard(gameInformation);
    }
    Game.prototype.collision = function () {
        var dim1 = { x: 5, y: 5 };
        var dim2 = { x: 20, y: 10 };
        var rockRect = document.getElementById('rock-0').getBoundingClientRect();
        var rocketshipRect = document.getElementById('rocketship').getBoundingClientRect();
        var rockW = rockRect.right - rockRect.left;
        var rockH = rockRect.bottom - rockRect.top;
        var rocketshipW = rocketshipRect.right - rocketshipRect.left;
        var rocketshipH = rocketshipRect.bottom - rocketshipRect.top;
        if (rockRect.left < rocketshipRect.left + rocketshipRect.width &&
            rockRect.left + rockRect.width > rocketshipRect.left &&
            rockRect.top < rocketshipRect.top + rocketshipRect.height &&
            rockRect.height + rockRect.top > rocketshipRect.top) {
            this._rock.remove(this._element);
            window.removeEventListener('keydown', this.keyDownHandler);
            console.log('collision');
        }
        else {
        }
    };
    Game.prototype.draw = function () {
        this._player.draw(this._element);
        this._rock.draw(this._element);
    };
    Game.prototype.update = function () {
        this._player.update();
        this._rock.update();
        this.collision();
    };
    Game.prototype.moveDown = function () {
        var _this = this;
        setTimeout(function () {
            var rockplace = _this._rock.yPos;
            if (rockplace <= 600) {
                _this._rock.moveDown();
            }
            else {
                _this._rock.remove(_this._element);
                _this._rock = new Rock('rock', 0);
                _this._rock.draw(_this._element);
                Events.trigger('addScore', { temp: 'someInformation' });
                console.log(_this._scoreboard);
            }
            _this.update();
            _this.moveDown();
        }, 50);
    };
    return Game;
}());
var GameItem = (function () {
    function GameItem(name, xPos, yPos) {
        this._name = name;
        this._xPos = xPos;
        this._yPos = yPos;
        this._element = document.createElement('div');
    }
    Object.defineProperty(GameItem.prototype, "xPos", {
        get: function () {
            return this._xPos;
        },
        set: function (xPosition) {
            this._xPos += xPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameItem.prototype, "yPos", {
        get: function () {
            return this._yPos;
        },
        set: function (yPosition) {
            this._yPos += yPosition;
        },
        enumerable: true,
        configurable: true
    });
    GameItem.prototype.draw = function (container) {
        this._element.className = this._name;
        this._element.id = this._name;
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    GameItem.prototype.update = function () {
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
    };
    return GameItem;
}());
var app;
(function () {
    var init = function () {
        app = new Game();
    };
    window.addEventListener('load', init);
})();
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse(name, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, xPosition, yPosition) || this;
    }
    Mouse.prototype.moveUp = function (yPosition) {
        this._yPos -= yPosition;
        this._element.classList.add('flying');
    };
    Mouse.prototype.moveDown = function (yPosition) {
        this._yPos += yPosition;
        this._element.classList.add('flying');
    };
    Mouse.prototype.moveLeft = function (xPosition) {
        this._xPos -= xPosition;
        this._element.classList.add('flying');
    };
    Mouse.prototype.moveRight = function (xPosition) {
        this._xPos += xPosition;
        this._element.classList.add('flying');
    };
    return Mouse;
}(GameItem));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        var _this = _super.call(this, name, xPosition, yPosition) || this;
        _this._id = id;
        return _this;
    }
    Rock.prototype.draw = function (container) {
        console.log('draw');
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name + "-" + this._id;
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
        var rnd = Math.floor(Math.random() * 100) + 1;
        this._element.style.left = rnd + "%";
    };
    Rock.prototype.moveDown = function () {
        this._yPos += 10;
    };
    Rock.prototype.remove = function (container) {
        var elem = document.getElementById(this._name + "-" + this._id);
        container.removeChild(elem);
    };
    return Rock;
}(GameItem));
var Scoreboard = (function () {
    function Scoreboard(element) {
        var _this = this;
        this._score = 0;
        this._parent = element;
        this.render();
        Events.on('startingPosition', function () { return _this.resetScore(0); });
        Events.on('addScore', function () { return _this.addScore(); });
    }
    Scoreboard.prototype.resetScore = function (score) {
        this._score = score;
        this._el.innerHTML = String(this._score);
    };
    Scoreboard.prototype.addScore = function () {
        this._score++;
        this._el.innerHTML = String(this._score);
    };
    Scoreboard.prototype.render = function () {
        this._el = document.createElement('div');
        this._el.className = 'score';
        this._el.innerHTML = String(this._score);
        this._parent.appendChild(this._el);
    };
    return Scoreboard;
}());
//# sourceMappingURL=main.js.map