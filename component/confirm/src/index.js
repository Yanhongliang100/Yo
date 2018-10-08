'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Confirm;

var _src = require('../../dialog/src');

var _src2 = _interopRequireDefault(_src);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Confirm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 确认弹框组件，居中显示需要关注的对话弹框组件，基于Dialog组件实现。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 类似浏览器原生API调用形式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 自定义组件显隐过程动画。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 返回一个Promise实例对象，可通过Then方法分别绑定确认、取消回调函数。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./confirm.md}{instruUrl: confirm.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var that = null;
var container = document.createElement('div');

var ConfirmReact = function (_Component) {
    _inherits(ConfirmReact, _Component);

    function ConfirmReact(props) {
        _classCallCheck(this, ConfirmReact);

        var _this = _possibleConstructorReturn(this, (ConfirmReact.__proto__ || Object.getPrototypeOf(ConfirmReact)).call(this, props));

        _this.state = {
            show: false,
            title: '',
            content: '',
            animation: 'none',
            btnText: ['确定', '取消'],
            onOk: function onOk() {},
            onCancel: function onCancel() {}
        };
        that = _this;
        return _this;
    }

    _createClass(ConfirmReact, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                show = _state.show,
                title = _state.title,
                content = _state.content,
                animation = _state.animation,
                onOk = _state.onOk,
                onCancel = _state.onCancel,
                btnText = _state.btnText;

            return _react2.default.createElement(
                _src2.default,
                {
                    show: show, title: title, onOk: onOk.bind(this),
                    animation: animation,
                    okText: btnText[0] != null && btnText[0],
                    cancelText: btnText[1] != null && btnText[1],
                    onCancel: onCancel ? onCancel.bind(this) : false
                },
                content
            );
        }
    }]);

    return ConfirmReact;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(ConfirmReact, null), container);

/**
 * @method Confirm
 * @param {Object} option 配置对象，可以接受以下属性：
 * @param {String} [option.content] 组件显示的内容
 * @param {String} [option.title] 组件显示标题
 * @param {Array} [option.btnText] <3.0.1> 按钮的文本，两个元素分别表示左/右按钮的文本
 * @param {Object} [option.animation] 组件显隐过程的动画，格式同Dialog组件
 * @param {Boolean} [option.cancel] 组件是否有取消按钮
 * @returns {Promise} 返回一个Promise实例对象
 * @description 确认弹框组件的调用方法，调用以后在屏幕正中弹出一个Confirm，可以按照option对象参数调用，也可以使用简易
 * 调用方式如 ``Confirm(content, title, btnText, animation, cancel)``
 */
function Confirm() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var btnText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['确定', '取消'];
    var animation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'fade';
    var cancel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object') {
        var opt = content;
        title = opt.title != null ? opt.title : '';
        content = opt.content != null ? opt.content : '';
        btnText = opt.btnText != null ? opt.btnText : ['确定', '取消'];
        animation = opt.animation != null ? opt.animation : 'fade';
        cancel = opt.cancel != null ? !!opt.cancel : true;
    }

    return new Promise(function (resolve) {
        // duration的默认值是300
        var duration = animation !== 'none' ? 300 : 0;
        // 看是否有自定义animation对象
        if (animation != null && animation.duration != null) {
            duration = animation.duration;
        }

        function okBtn() {
            setTimeout(function () {
                resolve(true);
            }, duration);
            that.setState({ show: false });
        }

        function cancelBtn() {
            setTimeout(function () {
                resolve(false);
            }, duration);
            that.setState({ show: false });
        }

        that.setState({
            show: true,
            title: title,
            content: content,
            btnText: btnText,
            animation: animation,
            onOk: okBtn,
            onCancel: cancel ? cancelBtn : false
        });
    });
}