'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _src = require('../../touchable/src');

var _src2 = _interopRequireDefault(_src);

var _src3 = require('../../popup/src');

var _src4 = _interopRequireDefault(_src3);

var _src5 = require('../../datetimepicker/src');

var _src6 = _interopRequireDefault(_src5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component PopupDateTimePicker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 由`Popup`和`DateTimePicker`组件结合的组件，能够方便的创建一个可弹出的 DateTimePicker。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./popupDateTimepicker.md}{instruUrl: popupdatetimepicker.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author tianqi.tian
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 定制触发区域和弹出式选择器触摸时附加的 className，必须。
     */
    touchClass: _react.PropTypes.string.isRequired,
    /**
     * @property value
     * @type Number/String
     * @default null
     * @description 组件的 value，参考网页`select`标签的 value 属性。
     *
     * value是一个严格受控属性，只能通过的父组件改变，你需要设置 onChange 属性来控制 value 属性的变化。
     */
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property range
     * @type array
     * @default null
     * @description 可选日期/时间的范围。格式为['YYYY-MM-DD','YYYY-MM-DD']或者['HH-MM','HH-MM']。
     */
    range: _react.PropTypes.array,
    /**
     * @property onChange
     * @type Function
     * @default () => {}
     * @param value 当前 datetimepicker 的 value
     * @description 弹出式选择器 Ok 按钮点击后的回调，必须。
     */
    onChange: _react.PropTypes.func.isRequired,
    /**
     * @property popupHeader
     * @type Object
     * @default  {
     *   title: '',
     *   okBtn: { text: '确定', touchClass: 'action-touch' },
     *   cancelBtn: { text: '取消', touchClass: 'action-touch' }
     * }
     * @description popup 区域头部的标题和按钮定制，分别为 title、okBtn 和 cancelBtn，
     *
     * 通过 title 键值定制 Popup 组件头部的标题文本。
     *
     * 通过 text 和 touchClass 键值定制按钮显示的文本和触摸按钮时附加的 className
     */
    popupHeader: _react.PropTypes.shape({
        title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
        okBtn: _react.PropTypes.shape({
            text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
            touchClass: _react.PropTypes.string
        }),
        cancelBtn: _react.PropTypes.shape({
            text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
            touchClass: _react.PropTypes.string
        })
    }),
    /**
     * @property duration
     * @type Number
     * @default 200ms
     * @description `Popup`组件的 duration 属性。组件内容显隐时，动画执行时间，单位：ms
     */
    duration: _react.PropTypes.number,
    /**
     * @property pickerHeight
     * @type Number
     * @default 150
     * @description `DateTimePicker`组件的 height 属性。控制`Picker`组件显示的内容高度
     */
    pickerHeight: _react.PropTypes.number.isRequired,
    /**
     * `DateTimePicker`组件的 dateOrTime 属性。日期或者时间模式
     *
     * @property dateOrTime
     * @type Enum {'date', 'time'},
     * @description `DateTimePicker`组件的 dateOrTime 属性。受控属性：'date'代表日期模式，即年月日模式，'time'代表时间模式，即时分模式
     * @default 'date'
     */
    dateOrTime: _react.PropTypes.oneOf(['date', 'time']),
    /**
     * `DateTimePicker`组件的 loop 属性。循环滚动模式
     *
     * @property loop
     * @type Array<Bool>
     * @description `DateTimePicker`组件的 loop 属性。受控属性：设置为 true，为无限循环滚动模式，反之为有限模式；默认为 true
     * @default [true, true, true]
     */
    loop: _react.PropTypes.arrayOf(_react.PropTypes.bool),
    /**
     * `DateTimePicker`组件的 unitsInline 属性。内联单位
     *
     * @property unitsInline
     * @type Array<String>
     * @description `DateTimePicker`组件的 unitsInline 属性。受控属性：在对应栏里的每个选项里添加对应的单位
     * @default []
     */
    unitsInline: _react.PropTypes.arrayOf(_react.PropTypes.string),
    /**
     * @property popupExtraClass
     * @type String
     * @default null
     * @description 附加popup区域根节点的额外 class
     */
    popupExtraClass: _react.PropTypes.string,
    children: _react.PropTypes.element
};

var defaultProps = {
    touchClass: null,
    dateOrTime: 'date',
    value: null,
    popupHeader: {
        title: null,
        okBtn: { text: '确定', touchClass: 'action-touch' },
        cancelBtn: { text: '取消', touchClass: 'action-touch' }
    },
    onChange: function onChange() {},
    pickerHeight: 150,
    duration: 200,
    loop: [true, true, true],
    unitsInline: ['年', '月', '日'],
    fieldExtraClass: null,
    popupExtraClass: null
};

// picker默认选择第一项
function defaultPickerValue(dateOrTime, props) {
    var now = new Date();
    var range = props.range;

    var value = null;

    if (Array.isArray(range) && range.length > 0) {
        value = range[0];
    } else {
        if (dateOrTime === 'date') {
            value = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        } else if (dateOrTime === 'time') {
            value = now.getHours() + ':' + now.getMinutes();
        }
    }
    return value;
}

var PopupDateTimePicker = function (_Component) {
    _inherits(PopupDateTimePicker, _Component);

    function PopupDateTimePicker(props) {
        _classCallCheck(this, PopupDateTimePicker);

        var _this = _possibleConstructorReturn(this, (PopupDateTimePicker.__proto__ || Object.getPrototypeOf(PopupDateTimePicker)).call(this, props));

        _this.state = {
            show: false,
            pickerValue: null
        };
        return _this;
    }

    _createClass(PopupDateTimePicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                value = _props.value,
                dateOrTime = _props.dateOrTime;

            if (value === null || value === undefined) {
                this.setState({
                    pickerValue: defaultPickerValue(dateOrTime, this.props)
                });
            } else {
                this.setState({
                    pickerValue: value
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updatePicker();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value != null && nextProps.value !== this.state.pickerValue) {
                this.setState({
                    pickerValue: nextProps.value
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updatePicker();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeChild(this.wrapper);
        }
    }, {
        key: 'createWrapper',
        value: function createWrapper() {
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'this-element-is-a-tricky-hack-for-popupdatetimepicker-please-just-ignore-it';
            document.body.appendChild(this.wrapper);
        }
    }, {
        key: 'updatePicker',
        value: function updatePicker() {
            if (this.wrapper == null) {
                this.createWrapper();
            }
            _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.renderPicker(), this.wrapper);
        }
    }, {
        key: 'show',
        value: function show() {
            this.setState({ show: true });
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ show: false });
        }
    }, {
        key: 'handlePopupOk',
        value: function handlePopupOk() {
            var _this2 = this;

            var onChange = this.props.onChange;

            return function () {
                _this2.hide();
                onChange(_this2.state.pickerValue);
            };
        }
    }, {
        key: 'handlePopupCancel',
        value: function handlePopupCancel() {
            var _props2 = this.props,
                value = _props2.value,
                dateOrTime = _props2.dateOrTime;

            this.hide();
            if (value === null || value === undefined) {
                this.setState({
                    pickerValue: defaultPickerValue(dateOrTime, this.props)
                });
            } else {
                this.setState({
                    pickerValue: value
                });
            }
        }
    }, {
        key: 'handlePickerChange',
        value: function handlePickerChange(value) {
            this.setState({
                pickerValue: value
            });
        }
    }, {
        key: 'renderPicker',
        value: function renderPicker() {
            var _props3 = this.props,
                dateOrTime = _props3.dateOrTime,
                popupHeader = _props3.popupHeader,
                pickerHeight = _props3.pickerHeight,
                duration = _props3.duration,
                loop = _props3.loop,
                unitsInline = _props3.unitsInline,
                popupExtraClass = _props3.popupExtraClass,
                range = _props3.range;

            var okBtn = null;
            var cancelBtn = null;
            var title = null;
            if (popupHeader) {
                title = popupHeader.title || defaultProps.popupHeader.title;
                okBtn = popupHeader.okBtn || defaultProps.popupHeader.okBtn;
                cancelBtn = popupHeader.cancelBtn || defaultProps.popupHeader.cancelBtn;
            }
            return _react2.default.createElement(
                _src4.default,
                {
                    show: this.state.show,
                    duration: duration,
                    extraClass: popupExtraClass,
                    onMaskTap: this.handlePopupCancel.bind(this)
                },
                _react2.default.createElement(
                    'div',
                    { className: 'yo-popup yo-popup-picker' },
                    _react2.default.createElement(
                        'header',
                        { className: 'yo-header yo-header-popup-picker' },
                        _react2.default.createElement(
                            'span',
                            { className: 'title' },
                            title
                        ),
                        _react2.default.createElement(
                            _src2.default,
                            {
                                onTap: this.handlePopupCancel.bind(this),
                                touchClass: cancelBtn.touchClass || defaultProps.popupHeader.cancelBtn.touchClass
                            },
                            _react2.default.createElement(
                                'span',
                                { className: 'regret' },
                                cancelBtn.text || defaultProps.popupHeader.cancelBtn.text
                            )
                        ),
                        _react2.default.createElement(
                            _src2.default,
                            {
                                onTap: this.handlePopupOk(),
                                touchClass: okBtn.touchClass || defaultProps.popupHeader.okBtn.touchClass
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'affirm' },
                                okBtn.text || defaultProps.popupHeader.okBtn.text
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'bd' },
                        _react2.default.createElement(_src6.default, {
                            value: this.state.pickerValue,
                            unitsInline: unitsInline,
                            dateOrTime: dateOrTime,
                            onChange: this.handlePickerChange.bind(this),
                            height: pickerHeight,
                            loop: loop,
                            range: range
                        })
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var touchClass = this.props.touchClass;

            return _react2.default.createElement(
                _src2.default,
                {
                    onTap: this.show.bind(this),
                    touchClass: touchClass
                },
                this.props.children
            );
        }
    }]);

    return PopupDateTimePicker;
}(_react.Component);

PopupDateTimePicker.propTypes = propTypes;
PopupDateTimePicker.defaultProps = defaultProps;

exports.default = PopupDateTimePicker;