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

var _src5 = require('../../picker/src');

var _src6 = _interopRequireDefault(_src5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component PopupPicker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 由`Popup`和`Picker`组件结合的组件，能够方便的创建一个可弹出的Picker。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./popuppicker.md}{instruUrl: popuppicker.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author tianqi.tian
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 定制触发区域和弹出式选择器触摸时附加的 className，必须
     */
    touchClass: _react.PropTypes.string.isRequired,
    /**
     * @property value
     * @type Number/String
     * @default null
     * @description 组件的value，参考网页`select`标签的 value 属性。
     *
     * value 是一个严格受控属性，只能通过的父组件改变，你需要设置 onChange 属性来控制 value 属性的变化。
     */
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property onChange
     * @type Function
     * @param value 当前的 option 的 value
     * @description 弹出式选择器 Ok 按钮点击后的回调，必须。
     */
    onChange: _react.PropTypes.func.isRequired,
    /**
     * @property options
     * @type Array
     * @default null
     * @description `Picker`组件的 options 属性。数组形式，元素的格式为`{text:string,value:string}`，
     *
     * text 为 option 显示的文本，value 为 option 对应的真实值（参考网页 option 标签），
     *
     * text 的缺省值为 value，value 必须传入，且只能为字符串/数字类型
     */
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired
    })).isRequired,
    /**
     * @property popupHeader
     * @type Object
     * @default {
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
     * @description `Picker`组件的 height 属性。控制 Picker 组件显示的内容高度
     */
    pickerHeight: _react.PropTypes.number.isRequired,
    /**
     * @property looped
     * @type Bool
     * @default true
     * @description `Picker`组件的 looped 属性。是否采用循环模式，默认为 true
     */
    looped: _react.PropTypes.bool,
    /**
     * @property unit
     * @type Number
     * @default null
     * @description `Picker`组件的 unit 属性。显示在 picker 右侧的单位。
     */
    unit: _react.PropTypes.string,
    /**
     * @property popupExtraClass
     * @type String
     * @default null
     * @description 附加 popup 区域根节点的额外 class
     */
    popupExtraClass: _react.PropTypes.string,
    children: _react.PropTypes.element
};

var defaultProps = {
    touchClass: '',
    value: null,
    options: null,
    popupHeader: {
        title: '',
        okBtn: { text: '确定', touchClass: 'action-touch' },
        cancelBtn: { text: '取消', touchClass: 'action-touch' }
    },
    onChange: function onChange() {},
    pickerHeight: 150,
    duration: 200,
    looped: true,
    unit: null,
    fieldExtraClass: null,
    popupExtraClass: null
};

// picker默认选择第一项
function defaultPickerValue(options) {
    if (Array.isArray(options) && options.length > 0) {
        return options[0].value;
    }
    return { value: null };
}

var PopupPicker = function (_Component) {
    _inherits(PopupPicker, _Component);

    function PopupPicker(props) {
        _classCallCheck(this, PopupPicker);

        var _this = _possibleConstructorReturn(this, (PopupPicker.__proto__ || Object.getPrototypeOf(PopupPicker)).call(this, props));

        _this.state = {
            show: false,
            pickerValue: null
        };
        return _this;
    }

    _createClass(PopupPicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                value = _props.value,
                options = _props.options;

            if (value === null || value === undefined) {
                this.setState({
                    pickerValue: defaultPickerValue(options)
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
            this.wrapper.className = 'this-element-is-a-tricky-hack-for-popuppicker-please-just-ignore-it';
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
                options = _props2.options;

            this.hide();
            if (value === null || value === undefined) {
                this.setState({
                    pickerValue: defaultPickerValue(options)
                });
            } else {
                this.setState({
                    pickerValue: value
                });
            }
        }
    }, {
        key: 'handlePickerChange',
        value: function handlePickerChange(option) {
            this.setState({
                pickerValue: option.value
            });
        }
    }, {
        key: 'renderPicker',
        value: function renderPicker() {
            var _props3 = this.props,
                options = _props3.options,
                popupHeader = _props3.popupHeader,
                duration = _props3.duration,
                pickerHeight = _props3.pickerHeight,
                looped = _props3.looped,
                unit = _props3.unit,
                popupExtraClass = _props3.popupExtraClass;

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
                            options: options,
                            value: this.state.pickerValue,
                            onChange: this.handlePickerChange.bind(this),
                            height: pickerHeight,
                            looped: looped,
                            unit: unit
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

    return PopupPicker;
}(_react.Component);

PopupPicker.propTypes = propTypes;
PopupPicker.defaultProps = defaultProps;

exports.default = PopupPicker;