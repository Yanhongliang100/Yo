'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CalendarCore = require('./CalendarCore.js');

var _CalendarCore2 = _interopRequireDefault(_CalendarCore);

var _CalendarItem = require('./CalendarItem.js');

var _CalendarItem2 = _interopRequireDefault(_CalendarItem);

var _src = require('../../grouplist/src/');

var _src2 = _interopRequireDefault(_src);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Calendar
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 日历组件，基于groupList组件实现。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 可通过以下两种方式定义日期范围:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  - 传入具体的起、始日期。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  - 传入距离系统当日的间隔天数，默认90。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 入住时间在今天之前，会被重置为今天。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 入住时间在离店时间之后，则互换。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 默认selectionStart、selectionEnd可选择同一天。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./calendar.md}{instruUrl: calendar.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProps = {
    duration: 90,
    extraClass: '',
    selectionStart: '',
    selectionEnd: '',
    selectionStartText: '入店',
    selectionEndText: '离店',
    allowSingle: false,
    onChange: function onChange() {},
    renderDate: function renderDate() {}
};

var propTypes = {
    /**
     * @property duration
     * @description 允许用户选择的日期范围，支持两种形式：传入数字，则表示从今天开始到N天后；传入形式为['yyyy-mm-dd','yyyy-mm-dd']的数组，
     * 可以直接设置起始日期和终止日期。
     * @type Number/Array
     * @default 90
     */
    duration: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
    /**
     * @property extraClass
     * @description 组件的额外样式
     * @type String
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property selectionStart
     * @description 默认选中范围的开始日期
     * @type String
     */
    selectionStart: _react.PropTypes.string,
    /**
     * @property selectionEnd
     * @description 默认选中范围的结束日期
     * @type String
     */
    selectionEnd: _react.PropTypes.string,
    /**
     * @property selectionStartText
     * @description 选中范围的开始日期标注，可传入文字或yo支持的icofont
     * @type String
     * @default '入店'
     */
    selectionStartText: _react.PropTypes.string,
    /**
     * @property selectionEndText
     * @description 选中范围的结束日期标注，可传入文字或yo支持的icofont
     * @type String
     */
    selectionEndText: _react.PropTypes.string,
    /**
     * @property allowSingle
     * @description 是否只允许选中单个日期
     * @type Bool
     * @default false
     */
    allowSingle: _react.PropTypes.bool,
    /**
     * @property onChange
     * @type Function
     * @param {Object} obj 选中范围的开始日期、结束日期对象
     * @param {String} obj.selectionStart 选中范围的开始日期
     * @param {String} obj.selectionEnd 选中范围的结束日期
     * @description 点击选中日期时回调函数
     */
    onChange: _react.PropTypes.func,
    /**
     * @property renderDate
     * @type Function
     * @param {Object} item 待渲染的日期数据对象
     * @param {String} ret 组件默认的日期渲染模板
     * @default () => {}
     * @description 每个日期对象渲染函数的模板。可自定义单个日期节点的显示内容。
     */
    renderDate: _react.PropTypes.func
};

var Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        var duration = props.duration,
            selectionStart = props.selectionStart,
            selectionEnd = props.selectionEnd,
            allowSingle = props.allowSingle;

        _this.calendarModel = new _CalendarCore2.default();
        _this.state = {
            data: _this.calendarModel.getData({ duration: duration, selectionStart: selectionStart, selectionEnd: selectionEnd, allowSingle: allowSingle })
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            // 注册点击check事件， 在CalendarCore理触发
            this.calendarModel.registerEventHandler('check', function (obj) {
                return _this2.props.onChange(obj);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var duration = nextProps.duration,
                selectionStart = nextProps.selectionStart,
                selectionEnd = nextProps.selectionEnd,
                allowSingle = nextProps.allowSingle;

            this.setState({
                data: this.calendarModel.getData({ duration: duration, selectionStart: selectionStart, selectionEnd: selectionEnd, allowSingle: allowSingle })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                renderDate = _props.renderDate,
                selectionStartText = _props.selectionStartText,
                selectionEndText = _props.selectionEndText,
                extraClass = _props.extraClass;

            return _react2.default.createElement(
                'section',
                { className: (0, _classnames2.default)('yo-calendar', extraClass) },
                _react2.default.createElement(
                    'ul',
                    { className: 'week-bar' },
                    _react2.default.createElement(
                        'li',
                        { className: 'weekend' },
                        '\u65E5'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        '\u4E00'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        '\u4E8C'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        '\u4E09'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        '\u56DB'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        '\u4E94'
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'weekend' },
                        '\u516D'
                    )
                ),
                _react2.default.createElement(_src2.default, {
                    isTitleStatic: true,
                    itemTouchClass: null,
                    renderGroupItem: function renderGroupItem(item) {
                        return _react2.default.createElement(_CalendarItem2.default, {
                            week: item.week,
                            isRender: item.isRender,
                            selectionStartText: selectionStartText,
                            selectionEndText: selectionEndText,
                            renderDate: renderDate,
                            onChange: function onChange(str) {
                                return _this3.calendarModel.handleChange(str);
                            }
                        });
                    },
                    dataSource: this.state.data
                })
            );
        }
    }]);

    return Calendar;
}(_react.Component);

exports.default = Calendar;


Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;