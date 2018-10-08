'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loading = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _modal = require('../../modal/src/modal');

var _modal2 = _interopRequireDefault(_modal);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 加载动画api
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component loading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @type {Object}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Loading API，调用后弹出一个居中的Loading Icon。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./loading.md}{instruUrl: loading.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zongze.li
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var container = document.createElement('div');
document.body.appendChild(container);

var that = null;

var loadingApiPropTypes = {
    /**
     * @property text
     * @type String
     * @default ''
     * @description loading伴随动画图标的文字。
     */
    text: _react.PropTypes.string,
    /**
     * @property extraClass
     * @type String
     * @default ''
     * @description 附加给loading组件内层的div的额外class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property modalExtraClass
     * @type String
     * @default ''
     * @description 附加给外层modal组件的额外class。
     */
    modalExtraClass: _react.PropTypes.string,
    /**
     * @property show
     * @type Bool
     * @default false
     * @description 是否显示loading，true为显示loading动画，false为隐藏。
     */
    show: _react.PropTypes.bool,
    /**
     * @property contentOffset
     * @type Array
     * @default [0,0]
     * @description 内容区在水平/垂直方向上的偏移,例如[0,-100]可以使模态框内容区向上偏移100个像素。
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
    maskOffset: _react.PropTypes.arrayOf(_react.PropTypes.number)
};

var loadingApiDefaultProps = {
    text: '',
    extraClass: '',
    show: false,
    contentOffset: [0, 0],
    maskOffset: [0, 0]
};

var LoadingApi = function (_Component) {
    _inherits(LoadingApi, _Component);

    function LoadingApi(props) {
        _classCallCheck(this, LoadingApi);

        var _this = _possibleConstructorReturn(this, (LoadingApi.__proto__ || Object.getPrototypeOf(LoadingApi)).call(this, props));

        _this.state = _extends({}, props);
        that = _this;
        return _this;
    }

    _createClass(LoadingApi, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                text = _state.text,
                modalExtraClass = _state.modalExtraClass,
                extraClass = _state.extraClass,
                restProps = _objectWithoutProperties(_state, ['text', 'modalExtraClass', 'extraClass']);

            return _react2.default.createElement(
                _modal2.default,
                _extends({
                    align: 'center',
                    extraClass: modalExtraClass
                }, restProps),
                _react2.default.createElement(_loading2.default, {
                    extraClass: extraClass,
                    text: text
                })
            );
        }
    }]);

    return LoadingApi;
}(_react.Component);

LoadingApi.propTypes = loadingApiPropTypes;
LoadingApi.defaultProps = loadingApiDefaultProps;

_reactDom2.default.render(_react2.default.createElement(LoadingApi, null), container);
exports.default = _loading2.default;
var loading = exports.loading = {
    /**
     * show展示
     * @method show
     * @category loading
     * @version 3.0.0
     * @param {Object} options 需要设置的组件属性，如预留顶部高度，额外样式之类的，具体见上面的属性文档描述。
     * @description api方法：显示Loding层，并设置传入的options参数中的属性。
     */
    show: function show(options) {
        that.setState(Object.assign({}, options, { show: true }));
    },
    /**
     * hide隐藏
     * @method hide
     * @category loading
     * @version 3.0.0
     * @description api方法：隐藏Loding层。
     */
    hide: function hide() {
        that.setState({ show: false });
    }
};