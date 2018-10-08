'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../common/tapEventPluginInit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 带遮罩层的模态弹层组件。支持多种位置和动画效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./modal.md}{instruUrl: modal.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    show: false,
    extraClass: '',
    contentExtraClass: '',
    align: 'center',
    onMaskTap: function onMaskTap() {},
    contentOffset: [0, 0],
    maskOffset: [0, 0],
    maskExtraClass: '',
    animation: '',
    onShow: function onShow() {},
    onHide: function onHide() {},
    width: null,
    height: null,
    delayBeforeAnimationStart: 100
};

var propTypes = {
    /**
     * @property show
     * @type Bool
     * @default false
     * @description 是否显示模态框
     */
    show: _react.PropTypes.bool.isRequired,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 附加给模态框容器(包含了内容区和蒙层)的额外class
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property contentExtraClass
     * @type String
     * @default null
     * @description 附加给模态框内容区的额外class
     */
    contentExtraClass: _react.PropTypes.string,
    /**
     * @property align
     * @type String
     * @default center
     * @description 模态框的位置,默认为center。可选值为cetner/top/bottom
     */
    align: _react.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    /**
     * @property onMaskTap
     * @type Function
     * @default ()=>{}
     * @description 点击蒙层时的回调
     */
    onMaskTap: _react.PropTypes.func,
    /**
     * @property contentOffset
     * @type Array
     * @default [0,0]
     * @description 内容区在水平/垂直方向上的偏移,例如[0,-100]可以使模态框内容区向上偏移100个像素
     */
    contentOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
    /**
     * @property maskOffset
     * @type Array
     * @default [0,0]
     * @description 蒙层遮盖的范围。如果不需要蒙层遮盖住整个屏幕,可以设置这个属性。
     *
     * 数组的第一个元素代表蒙层上边缘距离屏幕顶部的距离,第二个元素代表下边缘距离底部的距离。
     */
    maskOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
    /**
     * @property onShow
     * @type Function
     * @default ()=>{}
     * @description 打开模态框时，动画触发之前的事件回调
     */
    onShow: _react.PropTypes.func,
    /**
     * @property onHide
     * @type Function
     * @default ()=>{}
     * @description 关闭模态框时，动画触发之前的事件回调
     */
    onHide: _react.PropTypes.func,
    /**
     * @property width
     * @type Number/String
     * @default 'auto'
     * @description 内容区宽度,默认为auto,可以传入数字或者百分比
     */
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property height
     * @type Number/String
     * @default 'auto'
     * @description 内容区高度,默认为auto,可以传入数字或者百分比
     */
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property animation
     * @type String/Object
     * @default "none"
     * @description 打开/关闭动画
     *
     * 有已经实现好的动画fade,fade-in-down,fade-in-up,zoom,也可以自己传入classNames,实现定制的动画效果,例如
     * {animation:['actionsheet-up', 'actionsheet-down'],duration:200}
     * 数组中的第一个元素是打开模态框时附加到内容区的className,第二个是关闭时附加到内容区的className,duration是动画的持续时间,
     * action-sheet-up的css规则如下:
     *
     * ```css
     * @keyframes actionsheet-up {
     *     0% {
     *         transform: translate3d(0, 100%, 0);
     *     }
     *     100% {
     *         transform: translate3d(0, 0, 0);
     *     }
     * }
     * ```
     *
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
        animation: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
        duration: _react.PropTypes.number
    })]),
    delayBeforeAnimationStart: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.number])
};

// 默认提供的动画效果
var ANIMATION_MAP = {
    fade: { animation: ['fade-in', 'fade-out'], duration: 200 },
    zoom: { animation: ['zoom-in', 'zoom-out'], duration: 300 },
    'fade-in-up': { animation: ['fade-in-up', 'fade-out-down'], duration: 200 },
    'fade-in-down': { animation: ['fade-in-down', 'fade-out-up'], duration: 200 }
};

var RealModal = function (_Component) {
    _inherits(RealModal, _Component);

    function RealModal(props) {
        _classCallCheck(this, RealModal);

        var _this = _possibleConstructorReturn(this, (RealModal.__proto__ || Object.getPrototypeOf(RealModal)).call(this, props));

        _this.state = {
            show: props.show,
            animation: _this.getAnimationClass(props.animation, props.show)
        };
        return _this;
    }

    _createClass(RealModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.show) {
                this.props.onShow();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.toggleShowStatus(nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.hideTimeout);
            clearTimeout(this.showTimeout);
        }

        /**
         * 根据动画名字和打开/关闭状态获取对应的animation属性配置
         * @param name
         * @param isShow
         * @returns {{name: string, duration: number}}
         */

    }, {
        key: 'getAnimationClass',
        value: function getAnimationClass(name, isShow) {
            var contentAnimation = '',
                duration = 0;
            if (name) {
                var targetMap = _typeof(this.props.animation) === 'object' ? this.props.animation : ANIMATION_MAP[name];
                if (targetMap) {
                    contentAnimation = [targetMap.animation[isShow ? 0 : 1], 'ani'].join(' ');
                    duration = targetMap.duration;
                }
            }
            return { name: contentAnimation, duration: duration };
        }

        /**
         * 根据nextProps中的show属性更新内部state
         * @param nextProps
         */

    }, {
        key: 'toggleShowStatus',
        value: function toggleShowStatus(nextProps) {
            var _this2 = this;

            var current = this.state.show;
            var next = nextProps.show;
            var _props = this.props,
                onShow = _props.onShow,
                onHide = _props.onHide;
            // 如果新属性的show是true并且模态框处于打开状态

            if (!next && current) {
                // 提取需要指定的动画
                var animationData = this.getAnimationClass(nextProps.animation, next);
                clearTimeout(this.showTimeout);
                // show动画开始前执行onHide回调
                onHide();
                // 先走关闭动画
                this.setState({ animation: animationData });
                // 等到动画结束后处理整个modal的show状态,并且保存timeout引用
                this.hideTimeout = setTimeout(function () {
                    _this2.setState({ show: false });
                }, animationData.duration);
            } else if (next && !current) {
                // 清理关闭timeout
                // 写这一行的目的是用户可能在关闭的同时打开modal
                clearTimeout(this.hideTimeout);
                this.setState({ show: next });
                this.contentDom.style.visibility = 'hidden';

                // 如果直接运行动画会出现闪烁,这里先将contentDom隐藏然后再运行动画
                this.showTimeout = setTimeout(function () {
                    // hide动画开始前执行onShow回调
                    onShow();
                    _this2.setState({ animation: _this2.getAnimationClass(nextProps.animation, next) });
                    _this2.contentDom.style.visibility = 'visible';
                }, this.props.delayBeforeAnimationStart);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                show = _state.show,
                animation = _state.animation;
            var duration = animation.duration,
                name = animation.name;
            var _props2 = this.props,
                extraClass = _props2.extraClass,
                onMaskTap = _props2.onMaskTap,
                maskOffset = _props2.maskOffset,
                contentOffset = _props2.contentOffset,
                align = _props2.align,
                contentExtraClass = _props2.contentExtraClass,
                width = _props2.width,
                height = _props2.height;

            var containerClass = (0, _classnames2.default)('yo-modal', extraClass, 'yo-modal-' + align);
            var contentClass = (0, _classnames2.default)('cont', contentExtraClass, name);

            return _react2.default.createElement(
                'div',
                {
                    ref: 'container',
                    className: containerClass,
                    onTouchTap: function onTouchTap(evt) {
                        if (evt.target === _this3.refs.container) {
                            onMaskTap(evt);
                        }
                    },
                    style: Object.assign({
                        top: parseInt(maskOffset[0], 10),
                        bottom: parseInt(maskOffset[1], 10),
                        transform: 'translate3d(0,0,0)',
                        WebkitTransform: 'translate3d(0,0,0)'
                    }, show ? null : { display: 'none' })
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: contentClass,
                        ref: function ref(component) {
                            _this3.contentDom = component;
                        },
                        style: {
                            position: 'relative',
                            top: parseInt(contentOffset[1], 10) || 0,
                            left: parseInt(contentOffset[0], 10) || 0,
                            WebkitAnimationDuration: duration + 'ms',
                            animationDuration: duration + 'ms',
                            width: width,
                            height: height
                        }
                    },
                    this.props.children
                )
            );
        }
    }]);

    return RealModal;
}(_react.Component);

exports.default = RealModal;


RealModal.defaultProps = defaultProps;
RealModal.propTypes = propTypes;