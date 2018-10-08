'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Switch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 开关组件，在checkbox基础上封装，具有打开关闭以及过程动画、
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 支持设置禁用
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可配合样式扩展自定义样式，对颜色的修改请传入activeColor&defaultColor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author eva.li
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./switch.md}{instruUrl: switch.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ALLOWANCE = 4;
var propTypes = {
    /**
     * @property disabled
     * @type Bool
     * @default false
     * @description 是否禁用switch组件
     * 禁用switch后，UI操作不会影响到switch Value的变化
     */
    disabled: _react.PropTypes.bool,
    /**
     * @property checkd
     * @type Bool
     * @default true
     * @description 当前switch组件的值
     */
    checked: _react.PropTypes.bool,
    /**
     * @property extraClass
     * @type String
     * @description 额外添加到根节点上的className
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property onChange
     * @type Function
     * @description value值发生变化的时候触发
     */
    onChange: _react.PropTypes.func,
    /**
     * @property activeColor
     * @type String
     * @default '#4bd763'
     * @description activeColor 响应颜色
     * 当组件处于拖动状态时而非结果状态时需要JS辅助设置背景色
     * 当用户扩展switch样式改变颜色时需要传入
     */
    activeColor: _react.PropTypes.string,
    /**
     * @property defaultColor
     * @type String
     * @default '#fafafa'
     * @description defaultColor 关闭时的颜色
     * 当组件处于拖动状态时而非结果状态时需要JS辅助设置背景色
     * 当用户扩展switch样式改变颜色时需要传入
     */
    defaultColor: _react.PropTypes.string
};

var defaultProps = {
    disabled: false,
    checked: true,
    activeColor: '#4bd763',
    defaultColor: '#ccc'
};

var Switch = function (_Component) {
    _inherits(Switch, _Component);

    function Switch(props) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

        _this.state = {
            isMoving: false
        };
        _this.touchstart = _this.touchstart.bind(_this);
        _this.touchmove = _this.touchmove.bind(_this);
        _this.touchend = _this.touchend.bind(_this);
        _this.touchcancel = _this.touchcancel.bind(_this);
        return _this;
    }

    _createClass(Switch, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleDOM = this.handleDOM ? '' : this.widgetDOM.querySelector('.handle');
            this.trackDOM = !this.handleDOM ? '' : this.widgetDOM.querySelector('.track');
            var line = this.handleDOM.clientWidth;
            this.maxline = this.trackDOM.clientWidth - line * 1.2 - 2;
        }
    }, {
        key: 'touchstart',
        value: function touchstart(e) {
            e.preventDefault();
            e.stopPropagation();
            this.touchLocateStart = e.touches[0].clientX;
            var translateX = this.props.checked ? this.maxline : 0;
            this._setCSS(translateX);
            this.setState({
                isMoving: true
            });
        }
    }, {
        key: 'touchmove',
        value: function touchmove(e) {
            e.preventDefault();
            e.stopPropagation();
            var basic = this.props.checked ? this.maxline : 0;
            var translateX = e.touches[0].clientX - this.touchLocateStart + basic;
            if (Math.abs(translateX - basic) > ALLOWANCE) {
                translateX = translateX < this.maxline / 2 ? 0 : this.maxline;
                this._setCSS(translateX);
                this.touchmoved = true;
            }
        }
    }, {
        key: 'touchend',
        value: function touchend(e) {
            e.preventDefault();
            e.stopPropagation();
            var prevresult = this.props.checked;
            var result = void 0;
            if (this.touchmoved) {
                // 响应滑动事件
                var translateX = e.changedTouches[0].clientX - this.touchLocateStart + this.maxline;
                if (translateX < this.maxline / 2) {
                    result = false;
                } else {
                    result = true;
                }
            } else {
                // 响应tap事件
                result = !prevresult;
            }
            if (result !== prevresult) {
                this.props.onChange(result);
            }
            this.setState({
                isMoving: false
            });
            this._setCSS();
            this.touchmoved = false;
        }
    }, {
        key: 'touchcancel',
        value: function touchcancel(e) {
            e.preventDefault();
            e.stopPropagation();
            this._setCSS();
            this.touchmoved = false;
            this.setState({
                isMoving: false
            });
        }
    }, {
        key: '_setCSS',
        value: function _setCSS(translateX) {
            if (translateX != null) {
                this.handleDOM.style.transform = 'translateX(' + Math.round(translateX) + 'px) translateZ(0)';
                this.handleDOM.style.webkitTransform = 'translateX(' + Math.round(translateX) + 'px) translateZ(0)';
                // debugger
                this.trackDOM.style.backgroundColor = translateX === 0 ? this.props.defaultColor : this.props.activeColor;
            } else {
                this.handleDOM.style.transform = '';
                this.handleDOM.style.webkitTransform = '';
                this.trackDOM.style.backgroundColor = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classlist = ['yo-switch'];
            if (this.props.extraClass) classlist.push(this.props.extraClass.split(' '));
            return _react2.default.createElement(
                'label',
                {
                    className: classlist.join(' '),
                    ref: function ref(node) {
                        if (node) {
                            _this2.widgetDOM = node;
                        }
                    },
                    onTouchStart: this.props.disabled ? null : this.touchstart,
                    onTouchEnd: this.props.disabled ? null : this.touchend,
                    onTouchMove: this.props.disabled ? null : this.touchmove,
                    onTouchCancel: this.props.disabled ? null : this.touchcancel
                },
                _react2.default.createElement('input', {
                    type: 'checkbox',
                    disabled: this.props.disabled,
                    checked: this.props.checked,
                    onChange: function onChange() {}
                }),
                _react2.default.createElement(
                    'div',
                    {
                        className: this.state.isMoving ? 'track moving' : 'track'
                    },
                    _react2.default.createElement('span', { className: 'handle' })
                )
            );
        }
    }]);

    return Switch;
}(_react.Component);

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

exports.default = Switch;