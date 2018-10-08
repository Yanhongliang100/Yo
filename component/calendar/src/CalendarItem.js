'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../../common/tapEventPluginInit.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _src = require('../../touchable/src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 某一天的数据显示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    isRender: _react.PropTypes.bool,
    week: _react.PropTypes.array,
    selectionStartText: _react.PropTypes.string,
    selectionEndText: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    renderDate: _react.PropTypes.func
};

var WeekItem = function (_Component) {
    _inherits(WeekItem, _Component);

    function WeekItem() {
        _classCallCheck(this, WeekItem);

        return _possibleConstructorReturn(this, (WeekItem.__proto__ || Object.getPrototypeOf(WeekItem)).apply(this, arguments));
    }

    _createClass(WeekItem, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            if (this.props.isRender !== nextProps.isRender) {
                return true;
            }
            return nextProps.isRender;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(str) {
            if (!str) {
                return null;
            }
            return this.props.onChange(str);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                selectionStartText = _props.selectionStartText,
                selectionEndText = _props.selectionEndText,
                renderDate = _props.renderDate;

            var weeks = this.props.week.map(function (item, i) {
                var disabled = item.disabled,
                    today = item.today,
                    weekend = item.weekend,
                    holiday = item.holiday,
                    isCheckIn = item.isCheckIn,
                    isCheckOut = item.isCheckOut,
                    isCheck = item.isCheck;

                var fullDay = item.disabled ? null : item.date + '-' + item.day;
                var classNames = '';
                if (today) {
                    classNames += 'today ';
                }
                if (weekend) {
                    classNames += 'weekend ';
                }
                if (!!holiday) {
                    classNames += 'holiday ';
                }
                if (isCheckIn) {
                    classNames += 'start ';
                }
                if (isCheckOut) {
                    classNames += 'end ';
                }
                if (isCheck) {
                    classNames += 'range ';
                }
                if (disabled) {
                    classNames += 'disabled ';
                }

                var ret = [_react2.default.createElement(
                    'span',
                    { key: 0, className: 'day' },
                    item.day
                ), item.today ? _react2.default.createElement(
                    'ins',
                    { key: 1, className: 'special' },
                    '\u4ECA\u5929'
                ) : null, item.holiday ? _react2.default.createElement(
                    'ins',
                    { key: 2, className: 'special' },
                    item.holiday
                ) : null, item.isCheckIn ? _react2.default.createElement(
                    'span',
                    { key: 3, className: 'tip yo-ico' },
                    selectionStartText
                ) : null, item.isCheckOut ? _react2.default.createElement(
                    'span',
                    { key: 4, className: 'tip yo-ico' },
                    selectionEndText
                ) : null];
                return _react2.default.createElement(
                    _src2.default,
                    { key: i, onTap: function onTap() {
                            return _this2.handleChange(fullDay);
                        }, internalUse: true },
                    _react2.default.createElement(
                        'li',
                        {
                            className: classNames ? (0, _classnames2.default)(classNames) : null
                        },
                        renderDate(item, ret) || ret
                    )
                );
            });

            return _react2.default.createElement(
                'ul',
                { className: 'week' },
                weeks
            );
        }
    }]);

    return WeekItem;
}(_react.Component);

exports.default = WeekItem;


WeekItem.propTypes = propTypes;