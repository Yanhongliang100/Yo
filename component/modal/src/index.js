'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

require('../../common/tapEventPluginInit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 带遮罩层的模态弹层组件,支持多种位置和动画效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * 这个虚拟的组件将会利用renderSubtreeIntoContainer将Modal从原有的位置移动到body中
 */
var _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.wrapper = document.createElement('div');
            document.body.appendChild(this.wrapper);
            this.appendWrapperToDocBody();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.appendWrapperToDocBody();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeChild(this.wrapper);
        }
    }, {
        key: 'appendWrapperToDocBody',
        value: function appendWrapperToDocBody() {
            _reactDom2.default.unstable_renderSubtreeIntoContainer(this, _react2.default.createElement(
                _modal2.default,
                this.props,
                this.props.children
            ), this.wrapper);
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return _class;
}(_react.Component);

_class.propTypes = {
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
};
exports.default = _class;