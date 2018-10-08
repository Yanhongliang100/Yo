'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../../common/tapEventPluginInit');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../../touchable/src');

var _src2 = _interopRequireDefault(_src);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component InputNumber
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 数字输入框组件，输入特定范围内的数值。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可设置组件显示的数值范围，每次改变的步长。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 组件数值超过设置范围，按钮不可击。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 超过边界值，会自动设定为边界值。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可手动输入任意字符，若输入的不是数字，会自动回退到之前的数字。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 支持小数、负数形式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./inputNumber.md}{instruUrl: inputnumber.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProps = {
    value: 0,
    step: 1,
    min: -10000,
    max: 10000,
    decimalNum: 0,
    extraClass: '',
    disable: false,
    inputDisable: false,
    onChange: function onChange() {}
};

var propTypes = {
    /**
     * @property value
     * @description 组件默认显示的值
     * @type Number
     * @default 0
     */
    value: _react.PropTypes.number.isRequired,
    /**
     * @property step
     * @description 单次加减的步长
     * @type Number
     * @default 1
     */
    step: _react.PropTypes.number,
    /**
     * @property min
     * @description 组件显示的最小值
     * @type Number
     * @default -10000
     */
    min: _react.PropTypes.number,
    /**
     * @property max
     * @description 组件显示的最大值
     * @type Number
     * @default 10000
     */
    max: _react.PropTypes.number,
    /**
     * @property decimalNum
     * @description 组件显示的小数位数
     * @type Number
     * @default 0
     */
    decimalNum: _react.PropTypes.number,
    /**
     * @property extraClass
     * @description 组件额外的样式类
     * @type String
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property disable
     * @description 组件可不可用
     * @type Bool
     * @default false
     */
    disable: _react.PropTypes.bool,
    /**
     * @property inputDisable
     * @description 组件手动输入框是否不可用
     * @type Bool
     * @default false
     */
    inputDisable: _react.PropTypes.bool,
    /**
     * @property onChange
     * @description 修改数字时触发的回调函数
     * @param {Number} value 组件返回的数字
     * @type Function
     * @default () => {}
     */
    onChange: _react.PropTypes.func.isRequired
};

var Number = function (_Component) {
    _inherits(Number, _Component);

    function Number(props) {
        _classCallCheck(this, Number);

        var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));

        var value = props.value,
            step = props.step,
            min = props.min,
            max = props.max,
            decimalNum = props.decimalNum,
            disable = props.disable,
            inputDisable = props.inputDisable;

        _this.state = {
            min: min,
            max: max,
            step: step,
            value: value,
            decimalNum: decimalNum,
            disable: disable,
            inputDisable: inputDisable,
            plusDisable: false,
            minusDisable: false
        };
        _this._node = null;
        if (isNaN(value)) {
            throw new Error('不合法的value');
        }
        _this.cachedInput = value;
        return _this;
    }

    _createClass(Number, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resetState(this.state);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newState = Object.assign({}, this.state, nextProps, {
                plusDisable: false,
                minusDisable: false
            });
            this.resetState(newState);
        }

        /**
         * 返回一个合法的value
         * 不合法的情况包括:
         * value是NaN，这时候返回上一个合法的value
         * value>max或者value<min，返回max或者min
         * 否则返回原来的value
         * @param val
         * @param min
         * @param max
         * @returns {Number}
         */

    }, {
        key: 'getValidValue',
        value: function getValidValue(val) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.min;
            var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.max;

            var value = parseFloat(val);
            if (isNaN(value)) {
                return parseFloat(this.cachedInput);
            } else if (value < min) {
                return min;
            } else if (value > max) {
                return max;
            }
            return value;
        }

        /**
         * 重新渲染Number组件时更新组件的状态
         * @param obj {Object} this.state对象形式
         */

    }, {
        key: 'resetState',
        value: function resetState(obj) {
            var stateObj = obj;
            stateObj.step = parseFloat(stateObj.step) || 0;
            stateObj.max = parseFloat(stateObj.max) || 0;
            stateObj.min = parseFloat(stateObj.min) || 0;
            var disable = stateObj.disable,
                min = stateObj.min,
                max = stateObj.max,
                decimalNum = stateObj.decimalNum;
            var value = stateObj.value;
            // 格式化更新的数字

            value = this.getValidValue(value, min, max).toFixed(decimalNum);

            // 组件不可用时， 输入框和加减按钮均不可用
            if (disable) {
                this.setState({ value: value, disable: disable, inputDisable: true, plusDisable: true, minusDisable: true });
                return;
            }
            // 这里的比较要用toFixed以后的值
            // 设想这种场景，用户输入0.3，min设为0，步长是0，那么显示在input的是0
            // 但是value仍然是0.3，如果用0.3和min比较，显然0.3大于min，这时候minusDiable是false
            // 结果就是input显示0，但是-按钮并没有被禁用，这是不正确的
            if (parseFloat(value) === max) {
                stateObj.plusDisable = true;
            }
            if (parseFloat(value) === min) {
                stateObj.minusDisable = true;
            }
            stateObj.value = value;
            this.setState(stateObj);
        }

        /**
         * minusValue 减号触发的函数
         * @param val {Number} input输入框的value值
         */

    }, {
        key: 'minusValue',
        value: function minusValue(val) {
            if (this.state.minusDisable) {
                return;
            }
            var value = parseFloat(val) || 0;
            value -= this.state.step;
            this.wrapChange(value);
        }

        /**
         * plusValue 加好触发的函数， 参数为string形式，通过'+'运算符转为Number类型
         * @param val {String}
         */

    }, {
        key: 'plusValue',
        value: function plusValue(val) {
            if (this.state.plusDisable) {
                return;
            }
            var value = parseFloat(val) || 0;
            value += this.state.step;
            this.wrapChange(value);
        }

        /**
         * 在处理onChange的参数时要非常小心，因为允许用户通过键盘输入，可能会输入一个不符合decimalNum的数字
         * 例如domNum=0，step=1，输入0.3的情况
         * 这时候实际上组件会自动纠错，将0.3转化成0，这时候onChange的应该是纠错以后的value
         * 还有可能出现用户输入非法字符例如aaa，这时候会通过getValidValue来恢复上一次的合法输入
         * @param val
         * @returns {Number}
         */

    }, {
        key: 'wrapChange',
        value: function wrapChange(val) {
            var value = parseFloat(this.getValidValue(val).toFixed(this.state.decimalNum));
            this.props.onChange(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                inputDisable = _state.inputDisable,
                plusDisable = _state.plusDisable,
                minusDisable = _state.minusDisable;

            var minusDisableClass = minusDisable ? 'disabled' : '';
            var plusDisableClass = plusDisable ? 'disabled' : '';
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('yo-number', this.props.extraClass) },
                _react2.default.createElement(
                    _src2.default,
                    {
                        touchClass: minusDisable ? '' : 'action-touch',
                        onTap: function onTap() {
                            return _this2.minusValue(_this2._node.value);
                        }
                    },
                    _react2.default.createElement(
                        'span',
                        { className: (0, _classnames2.default)('minus', minusDisableClass) },
                        '-'
                    )
                ),
                _react2.default.createElement('input', {
                    className: 'input', type: 'text', value: this.state.value,
                    disabled: inputDisable ? 'disabled' : '',
                    ref: function ref(target) {
                        _this2._node = target;
                    },
                    onChange: function onChange(evt) {
                        // 允许使用者输入任意字符，在blur的时候再去检测他的输入是否合法
                        _this2.setState({ value: evt.target.value });
                    },
                    onBlur: function onBlur(evt) {
                        _this2.wrapChange(evt.target.value);
                    },
                    onFocus: function onFocus(evt) {
                        // 保存当前的value，这个value一定是合法的
                        // 如果输入的字符不合法，就使用保存的value进行恢复
                        // 同时，需要禁止+-按钮的点击
                        _this2.cachedInput = evt.target.value;
                        _this2.setState({ plusDisable: true, minusDisable: true });
                    }
                }),
                _react2.default.createElement(
                    _src2.default,
                    {
                        touchClass: plusDisable ? '' : 'action-touch',
                        onTap: function onTap() {
                            return _this2.plusValue(_this2._node.value);
                        }
                    },
                    _react2.default.createElement(
                        'span',
                        { className: (0, _classnames2.default)('plus', plusDisableClass) },
                        '+'
                    )
                )
            );
        }
    }]);

    return Number;
}(_react.Component);

exports.default = Number;


Number.defaultProps = defaultProps;
Number.propTypes = propTypes;