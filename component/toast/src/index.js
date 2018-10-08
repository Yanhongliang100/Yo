'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Toast
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 面包屑提示组件，页面居中显示一条提示信息。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 是一个对象，包含show/hide函数，支持简单的链式调用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 通过调用show函数打开组件，默认显示2s。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 通过调用hide函数立刻关闭组件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./toast.md}{instruUrl: toast.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var that = null;
var container = document.createElement('div'),
    defaultProps = {
    show: false
},
    propTypes = {
    /**
     * @property show
     * @description 是否显示，默认false
     * @type Boolean
     * @default false
     * @skip
     */
    show: _react.PropTypes.bool
};

document.body.appendChild(container);

var ToastReact = function (_Component) {
    _inherits(ToastReact, _Component);

    function ToastReact(props) {
        _classCallCheck(this, ToastReact);

        var _this = _possibleConstructorReturn(this, (ToastReact.__proto__ || Object.getPrototypeOf(ToastReact)).call(this, props));

        _this.state = {
            show: _this.props.show,
            content: '',
            autoHideTime: 2000
        };
        _this._timer = null;
        that = _this;
        return _this;
    }

    _createClass(ToastReact, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _this2 = this;

            this.setState({ show: nextState.show });
            if (!!this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
            }

            this._timer = setTimeout(function () {
                return _this2.setState({ show: false });
            }, nextState.autoHideTime);
            return true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this._timer);
            document.body.removeChild(container);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                show = _state.show,
                content = _state.content;

            return _react2.default.createElement(
                'div',
                {
                    className: 'yo-toast',
                    style: {
                        display: show ? null : 'none'
                    }
                },
                content
            );
        }
    }]);

    return ToastReact;
}(_react.Component);

ToastReact.propTypes = propTypes;
ToastReact.defaultProps = defaultProps;

_reactDom2.default.render(_react2.default.createElement(ToastReact, null), container);

/**
 * Toast显隐函数
 * @returns {Object}
 */
exports.default = {
    /**
     * @method show
     * @type Function
     * @description 打开组件，显示传入的内容
     * @param {String} content 组件显示的内容
     * @param {Number} [autoHideTime] 内容显示的持续时间，默认2000ms
     */
    show: function show() {
        var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'no content';
        var autoHideTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

        that.setState({
            content: content,
            autoHideTime: autoHideTime,
            show: true
        });
        return this;
    },

    /**
     * @method hide
     * @type Function
     * @description 关闭正在显示的组件
     */
    hide: function hide() {
        that.setState({ show: false });
        return this;
    }
};