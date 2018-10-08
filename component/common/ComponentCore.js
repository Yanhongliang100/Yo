'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 大型组件使用的抽象Model类，用于集中管理组件内部的逻辑和状态。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ComponentCore = function (_EventEmitter) {
    _inherits(ComponentCore, _EventEmitter);

    function ComponentCore(namespace) {
        _classCallCheck(this, ComponentCore);

        var _this = _possibleConstructorReturn(this, (ComponentCore.__proto__ || Object.getPrototypeOf(ComponentCore)).call(this));

        _this.instanceId = ++ComponentCore.instanceId;
        _this.namespace = namespace;
        return _this;
    }

    _createClass(ComponentCore, [{
        key: '_getEventName',
        value: function _getEventName(eventName) {
            return 'yo/component/' + this.namespace + '/' + eventName + '/' + this.instanceId;
        }
    }, {
        key: 'emitEvent',
        value: function emitEvent(eventName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this.emit.apply(this, [this._getEventName(eventName)].concat(args));
            return this;
        }
    }, {
        key: 'registerEventHandler',
        value: function registerEventHandler(eventName, handler) {
            this.on(this._getEventName(eventName), handler.bind(this));
            return this;
        }
    }, {
        key: 'getAttr',
        value: function getAttr(item, attrKey) {
            return typeof item.get === 'function' ? item.get(attrKey) : item[attrKey];
        }
    }, {
        key: 'setAttr',
        value: function setAttr(item, attrKey, value) {
            var ret = null;
            if (typeof item.set === 'function') {
                ret = item.set(attrKey, value);
            } else {
                ret = Object.assign({}, item, _defineProperty({}, attrKey, value));
            }
            return ret;
        }
    }]);

    return ComponentCore;
}(_EventEmitter3.default);

ComponentCore.instanceId = -1;
exports.default = ComponentCore;