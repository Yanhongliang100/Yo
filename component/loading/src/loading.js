'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 加载动画组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Loading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Loading text="text" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 加载动画组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zongze.li
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    text: _react.PropTypes.string,
    extraClass: _react.PropTypes.string
};
var LoadingDefaultProps = {
    /**
     * @property text
     * @type PropTypes.string
     * @default ''
     * @description 组件属性：loading伴随动画图标的文字
     */
    text: '',
    /**
     * @property extraClass
     * @type PropTypes.string
     * @default ''
     * @description 组件属性：附加给Loading组件的额外class
     */
    extraClass: ''
};

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)('yo-loading', props.extraClass)
                },
                _react2.default.createElement('i', { className: 'yo-ico' }),
                !!props.text.toString().length && _react2.default.createElement(
                    'span',
                    { className: 'text' },
                    props.text
                )
            );
        }
    }]);

    return Loading;
}(_react.Component);

exports.default = Loading;


Loading.propTypes = propTypes;
Loading.defaultProps = LoadingDefaultProps;