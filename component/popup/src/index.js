'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _src = require('../../modal/src');

var _src2 = _interopRequireDefault(_src);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Popup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 弹出组件，支持上、下两个方向的弹出组件，基于Modal组件实现。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可设置组件内容弹出的方向，高度和效果执行时间。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可设置组件背景遮罩层的上、下偏移量。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./popup.md}{instruUrl: popup.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var noop = function noop() {};

var propTypes = {
  /**
   * @property show
   * @type Bool
   * @description 组件是否显示
   * @default false
   */
  show: _react.PropTypes.bool,
  /**
   * @property duration
   * @type Number
   * @description 组件内容显隐时，动画执行时间，单位：ms
   * @default 200ms
   */
  duration: _react.PropTypes.number,
  /**
   * @property height
   * @type String/Number
   * @description 组件显示的内容高度
   * @default 'auto'
   */
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  /**
   * @property direction
   * @type Enum {'up', 'down'}
   * @description 组件动画打开方向
   * @default 'up'
   */
  direction: _react.PropTypes.oneOf(['up', 'down']),
  /**
   * @method onMaskTap
   * @type Function
   * @description 组件背景遮罩层的点击回调
   * @default () => {}
   */
  onMaskTap: _react.PropTypes.func,
  /**
   * @method onShow
   * @type Function
   * @description 组件打开时，动画触发之前的事件回调
   * @default () => {}
   */
  onShow: _react.PropTypes.func,
  /**
   * @method onHide
   * @type Function
   * @description 组件关闭时，动画触发之前的事件回调
   * @default () => {}
   */
  onHide: _react.PropTypes.func,
  /**
   * @property maskOffset
   * @type Array<Number>
   * @description 组件背景遮罩层的上、下偏移量
   * @default [0, 0]
   */
  maskOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
  /**
   * @property extraClass
   * @type String
   * @description 组件额外样式类
   */
  extraClass: _react.PropTypes.string,
  delayBeforeAnimationStart: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])
};

var defaultPros = {
  duration: 200,
  height: 'auto',
  direction: 'up',
  onMaskTap: noop,
  onShow: noop,
  onHide: noop
};

var Popup = function (_Component) {
  _inherits(Popup, _Component);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          show = _props.show,
          duration = _props.duration,
          height = _props.height,
          direction = _props.direction,
          onMaskTap = _props.onMaskTap,
          onShow = _props.onShow,
          onHide = _props.onHide,
          maskOffset = _props.maskOffset,
          extraClass = _props.extraClass,
          children = _props.children,
          delayBeforeAnimationStart = _props.delayBeforeAnimationStart;

      var animation = direction === 'up' ? ['fade-in-up', 'fade-out-down'] : ['fade-in-down', 'fade-out-up'];
      var align = direction === 'up' ? 'bottom' : 'top';
      return _react2.default.createElement(
        _src2.default,
        {
          show: show,
          height: height,
          width: '100%',
          direction: direction,
          onMaskTap: onMaskTap,
          onShow: onShow,
          onHide: onHide,
          align: align,
          animation: { animation: animation, duration: duration },
          maskOffset: maskOffset,
          contentExtraClass: extraClass,
          delayBeforeAnimationStart: delayBeforeAnimationStart
        },
        children
      );
    }
  }]);

  return Popup;
}(_react.Component);

exports.default = Popup;


Popup.propTypes = propTypes;
Popup.defaultProps = defaultPros;