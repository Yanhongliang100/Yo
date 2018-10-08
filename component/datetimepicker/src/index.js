'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../../picker/src');

var _src2 = _interopRequireDefault(_src);

var _datetimecore = require('./datetimecore');

var _datetimecore2 = _interopRequireDefault(_datetimecore);

var _util = require('../../common/util');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 日期、时间选择
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component DateTimePicker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 可提供一些日期或者时间序列供用户选择，并返回用户选择的结果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./dateTimePicker.md}{instruUrl: datetimepicker.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zongze.li
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    /**
     * 容器高度
     *
     * @property height
     * @type Number
     * @description 受控属性：决定容器展示的高度
     * @default 150
     */
    height: _react.PropTypes.number,
    /**
     * 起止区间
     *
     * @property range
     * @type Array<String>
     * @description 受控属性：区间范围开始于, 结束于；可以用非数字符号做为分隔符;
     * @default ['1900-01-01', format(new Date(), 'xxxx-xx-xx')]
     */
    range: _react.PropTypes.arrayOf(_react.PropTypes.string),
    /**
     * 当前区间默认显示的点
     *
     * @property value
     * @type String
     * @description 受控属性：区间范围内当前默认值，可以用非数字符号做为分隔符；
     * @default '2016-8-28'
     */
    value: _react.PropTypes.string,
    /**
     * 循环滚动模式
     *
     * @property loop
     * @type Array<Bool>
     * @description 受控属性：设置为true，为无限循环滚动模式，反之为有限模式；默认为true
     * @default [true, true, true]
     */
    loop: _react.PropTypes.arrayOf(_react.PropTypes.bool),
    /**
     * 内联单位
     *
     * @property unitsInline
     * @type Array<String>
     * @description 受控属性：在对应栏里的每个选项里添加对应的单位；
     * @default []
     */
    unitsInline: _react.PropTypes.arrayOf(_react.PropTypes.string),
    /**
     * 右旁单位
     *
     * @property unitsAside
     * @type Array<String>
     * @description 受控属性：在对应栏里的垂直居中，水平偏右位置，显示当前栏目对应的单位；
     * @default []
     */
    unitsAside: _react.PropTypes.arrayOf(_react.PropTypes.string),
    /**
     * 日期或者时间模式
     *
     * @property dateOrTime
     * @type Enum {'date', 'time'},
     * @description 受控属性：'date'代表日期模式，即年月日模式，'time'代表时间模式，即时分模式
     * @default 'date'
     */
    dateOrTime: _react.PropTypes.oneOf(['date', 'time']),
    /**
     * 数字映射字符串函数
     *
     * @property format
     * @type Function
     * @description 受控属性：默认显示的date或者time是数字，传入该函数，会将数字作为参数，经该函数处理后，返回一个经过包装的字符串，这时将会以字符串作为默认的显示选项；该函数有两个参数(value, level)。
     * @param {Number} value 对应栏目的序列中的单个值
     * @param {Number} level 指代对应的栏目，从左往右递增，从0开始
     * @default (value, level) => value
     */
    format: _react.PropTypes.func,
    /**
     * onChange回调函数
     *
     * @property onChange
     * @type Function
     * @description onChange回调函数，用以将当前选择的项目传递给上层，来触发更新。回传的参数有两个(value, item)。
     * @param {Object} value 为当前组件应更新到的状态
     * @param {Object} item 为当前滑到最中间位置的，选中的数据，包含了一些可能有用的较为详细的信息
     * @default (value, item) => {}
     */
    onChange: _react.PropTypes.func,
    /**
     * 额外类名
     *
     * @property extraClass
     * @type String
     * @description 受控属性：本组件额外的css类
     * @default []
     */
    extraClass: _react.PropTypes.string
};

function toStandardDateStr(value) {
    return String(value).length < 2 ? '0' + value : value;
}

var DateTimePickerDefaultProps = {
    height: 150,
    loop: [true, true, true],
    unitsInline: [],
    unitsAside: [],
    dateOrTime: 'date',
    format: toStandardDateStr,
    onChange: function onChange(value, level) {
        console.log(value, level, '请设置onChange函数，自行setState更新状态');
    },
    extraClass: ''
};

var DateTimePicker = function (_Component) {
    _inherits(DateTimePicker, _Component);

    function DateTimePicker(props) {
        _classCallCheck(this, DateTimePicker);

        var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

        var date = new Date();
        _this.defaultRange = {
            time: ['00:00', '23:59'],
            date: ['1900-01-01', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()]
        };
        _this.regxNum = /[0-9]+/g;
        _this.symbol = props.value.match(/\D/);
        _this.splitStrToArray = function (str) {
            return str.match(_this.regxNum).map(function (cur) {
                return parseInt(cur, 10);
            });
        };
        var len = _this.splitStrToArray(_this.props.value).length;
        _this.levels = (0, _util.getArrayByLength)(len).fill(1).map(function (cur, index) {
            return index;
        });

        var range = props.range,
            value = props.value,
            dateOrTime = props.dateOrTime,
            format = props.format,
            unitsInline = props.unitsInline,
            newRange = range || _this.defaultRange[_this.props.dateOrTime],
            rangeArr = newRange.map(function (curr) {
            return _this.splitStrToArray(curr);
        });

        _this.dateTimeModel = new _datetimecore2.default(_this.splitStrToArray(value), rangeArr, unitsInline, dateOrTime, format);
        _this.state = _extends({
            levels: _this.levels
        }, _this.dateTimeModel.multiPickerState);
        return _this;
    }

    _createClass(DateTimePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var range = nextProps.range,
                dateOrTime = nextProps.dateOrTime,
                unitsInline = nextProps.unitsInline,
                format = nextProps.format,
                loop = nextProps.loop,
                nextValue = this.splitStrToArray(nextProps.value);

            if (this.props.format !== format || this.props.dateOrTime !== dateOrTime || range !== undefined && this.props.range !== range || this.props.unitsInline !== unitsInline || this.props.loop !== loop) {
                var newRange = range || this.defaultRange[dateOrTime],
                    rangeArr = newRange.map(function (curr) {
                    return _this2.splitStrToArray(curr);
                });

                if (this.props.dateOrTime !== dateOrTime) {
                    this.levels = (0, _util.getArrayByLength)(rangeArr[0].length).fill(1).map(function (cur, index) {
                        return index;
                    });
                }
                this.dateTimeModel.refresh(nextValue, rangeArr, dateOrTime, unitsInline, format, loop).deepUpdateMultiPickerState();
            } else {
                this.dateTimeModel.updateDateTime(nextValue);
            }

            this.setState(_extends({}, this.dateTimeModel.multiPickerState, { levels: this.levels }));
        }
    }, {
        key: '_handleOnChange',
        value: function _handleOnChange(item, level) {
            var _this3 = this;

            var nextValue = this.dateTimeModel.getNextValue(item.value, level),
                newValueState = nextValue.map(function (value) {
                return toStandardDateStr(value);
            }).join(this.symbol),
                text = nextValue.map(function (val, index) {
                return _this3.props.format(val, index);
            }).join(this.symbol);

            if (this.props.onChange) {
                this.props.onChange(newValueState, text, item, level);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('yo-datetimepicker', this.props.extraClass) },
                this.state.levels.map(function (optId, level) {
                    return _react2.default.createElement(_src2.default, {
                        key: 'picker' + level,
                        stopPropagation: true,
                        options: _this4.state[optId].options,
                        value: _this4.state[optId].value,
                        unit: _this4.props.unitsAside[level],
                        looped: _this4.props.loop[level],
                        onChange: function onChange(item) {
                            _this4._handleOnChange(item, level);
                        },
                        height: _this4.props.height
                    });
                })
            );
        }
    }]);

    return DateTimePicker;
}(_react.Component);

exports.default = DateTimePicker;


DateTimePicker.propTypes = propTypes;
DateTimePicker.defaultProps = DateTimePickerDefaultProps;