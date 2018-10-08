'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gesture = require('./gesture');

var _gesture2 = _interopRequireDefault(_gesture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Touchable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description `Touchable` 组件是一个"虚拟"组件，它不会真的在文档中创建一个 `dom` 节点作为根节点，而是返回它唯一的子组件的一个克隆，并给它绑定一些手势事件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 除了能给 `dom` 绑定 `tap` 事件之外，它还解决了一些移动端的手势"顽疾"，例如触摸反馈和滚动/触摸的冲突问题。在需要绑定 `tap` 事件的情况下，应该优先使用 `Touchable`，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 而不是直接把 `tap` 事件回调绑定给 `dom`。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./touchable.md}{instruUrl: touchable.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Touchable = function (_Component) {
    _inherits(Touchable, _Component);

    function Touchable() {
        _classCallCheck(this, Touchable);

        return _possibleConstructorReturn(this, (Touchable.__proto__ || Object.getPrototypeOf(Touchable)).apply(this, arguments));
    }

    _createClass(Touchable, [{
        key: 'render',
        value: function render() {
            if (process.env.NODE_ENV !== 'production') {
                if (this.props.touchClass == null && !this.props.internalUse) {
                    console.error('yo-touchable: Touchable组件没有设置touchClass, 出于用户体验考虑, 应该尽量给触摸区域添加触摸反馈。');
                }
            }

            var onlyChild = _react2.default.Children.only(this.props.children);
            var gestureObj = (0, _gesture2.default)(this, this.context.scroller, this.context.swipeMenuList, this.props.touchClass, this.props.onTap, this.props.onTouchStart);
            var onTouchStart = gestureObj.onTouchStart,
                onTouchMove = gestureObj.onTouchMove,
                onTouchEnd = gestureObj.onTouchEnd,
                onTouchCancel = gestureObj.onTouchCancel;


            return _react2.default.cloneElement(onlyChild, { onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd, onTouchCancel: onTouchCancel });
        }
    }]);

    return Touchable;
}(_react.Component);

Touchable.propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 触摸Touchable时附加的className，可以用来实现Native常见的触摸反馈功能(例如给触摸区域添加深色背景或者改变透明度等等)。
     */
    touchClass: _react.PropTypes.string,
    /**
     * @property onTap
     * @type Function
     * @default null
     * @param {DOMElement} target tap事件的target
     * @description 给Touchable绑定的onTap事件。
     */
    onTap: _react.PropTypes.func,
    /**
     * @skip 给List定制的属性
     */
    onTouchStart: _react.PropTypes.func,
    /**
     * @skip 内部使用标志
     */
    internalUse: _react.PropTypes.bool,
    children: _react.PropTypes.object
};
Touchable.defaultProps = {
    onTouchStart: function onTouchStart() {},
    touchClass: null,
    onTap: function onTap() {},
    internalUse: false
};
Touchable.contextTypes = {
    scroller: _react.PropTypes.object,
    swipeMenuList: _react.PropTypes.object
};
exports.default = Touchable;