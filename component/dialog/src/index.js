'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../../modal/src');

var _src2 = _interopRequireDefault(_src);

var _src3 = require('../../touchable/src');

var _src4 = _interopRequireDefault(_src3);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Dialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 对话弹框组件，可自定义显示位置的对话弹框，基于Modal组件实现。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可自定义组件弹层内容的大小、显示位置。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可自定义组件背景阴影遮罩层的上偏移、下偏移。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 弹层显隐的动画可使用自定义的css3动画或modal组件默认的fade动画。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./dialog.md}{instruUrl: dialog.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    show: false,
    animation: 'fade',
    title: '',
    content: '',
    width: 'auto',
    height: 'auto',
    align: 'center',
    contentOffset: [0, 0],
    maskOffset: [0, 0],
    extraClass: '',
    okText: '确定',
    cancelText: '取消',
    onOk: function onOk() {},
    onCancel: function onCancel() {}
};

var propTypes = {
    /**
     * @property show
     * @description 组件是否显示
     * @type Bool
     * @default false
     */
    show: _react.PropTypes.bool,
    /**
     * @property effect
     * @description 组件显隐时采用的动画
     *
     * ```
     * PropTypes.oneOfType([
     * PropTypes.string,
     * PropTypes.shape({
     *       animation: PropTypes.arrayOf(PropTypes.string).isRequired,
     *        duration: PropTypes.number.isRequired
     *    })
     * ])
     * ```
     * @type String/Object
     * @default 'none'
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
        animation: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
        duration: _react.PropTypes.number.isRequired
    })]),
    /**
     * @property title
     * @description 组件显示的标题
     * @type Element/String
     */
    title: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]),
    /**
     * @property width
     * @description 组件显示的内容宽度
     * @type Number/String
     * @default 'auto'
     */
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property height
     * @description 组件显示的内容高度
     * @type Number/String
     * @default 'auto'
     */
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property align
     * @description 组件显示内容的垂直方向位置
     * @type Enum {'top', 'bottom', 'center'}
     * @default "center"
     */
    align: _react.PropTypes.oneOf(['top', 'center', 'bottom']),
    /**
     * @property contentOffset
     * @description 组件显示内容的X轴、Y轴偏移量
     * @type Array<Number>
     * @default [0, 0]
     */
    contentOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
    /**
     * @property maskOffset
     * @description 组件遮罩层的顶部、底部偏移量
     * @type Array<Number>
     * @default [0, 0]
     */
    maskOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
    /**
     * @property extraClass
     * @description 组件额外样式类
     * @type String
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property okText
     * @description 组件确定按钮的内容
     * @type String
     * @default '确定'
     */
    okText: _react.PropTypes.string,
    /**
     * @property cancelText
     * @description 组件取消按钮的内容
     * @type String
     * @default '取消'
     */
    cancelText: _react.PropTypes.string,
    /**
     * @property onOk
     * @description 组件确定按钮的回调函数，`false`表示不显示确定按钮
     * @type Bool/Function
     * @default () => {}
     */
    onOk: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
    /**
     * @property onCancel
     * @description 组件取消按钮的回调函数，`false`表示不显示取消按钮
     * @type Bool/Function
     * @default () => {}
     */
    onCancel: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
    children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array, _react.PropTypes.string])
};

var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog() {
        _classCallCheck(this, Dialog);

        return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
    }

    _createClass(Dialog, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                show = _props.show,
                title = _props.title,
                animation = _props.animation,
                width = _props.width,
                height = _props.height,
                align = _props.align,
                contentOffset = _props.contentOffset,
                maskOffset = _props.maskOffset,
                extraClass = _props.extraClass,
                okText = _props.okText,
                cancelText = _props.cancelText,
                onOk = _props.onOk,
                onCancel = _props.onCancel,
                children = _props.children;

            var cancelBtnNode = onCancel ? _react2.default.createElement(
                _src4.default,
                { onTap: onCancel, touchClass: 'yo-btn-touch' },
                _react2.default.createElement(
                    'button',
                    {
                        className: 'yo-btn yo-btn-dialog yo-btn-l'
                    },
                    cancelText
                )
            ) : null;
            var okBtnNode = onOk ? _react2.default.createElement(
                _src4.default,
                { onTap: onOk, touchClass: 'yo-btn-touch' },
                _react2.default.createElement(
                    'button',
                    {
                        className: 'yo-btn yo-btn-dialog yo-btn-l'
                    },
                    okText
                )
            ) : null;
            return _react2.default.createElement(
                _src2.default,
                {
                    align: align,
                    show: show,
                    width: width,
                    height: height,
                    animation: animation || '',
                    contentOffset: contentOffset,
                    maskOffset: maskOffset,
                    onMaskTap: function onMaskTap() {}
                },
                _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('yo-dialog', extraClass) },
                    _react2.default.createElement(
                        'header',
                        { className: 'hd' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'title' },
                            title
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'bd' },
                        children
                    ),
                    _react2.default.createElement(
                        'footer',
                        { className: 'ft' },
                        cancelBtnNode,
                        okBtnNode
                    )
                )
            );
        }
    }]);

    return Dialog;
}(_react.Component);

exports.default = Dialog;


Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;