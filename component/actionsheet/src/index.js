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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component ActionSheet
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 底部弹出菜单组件，基于Popup组件实现。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 类似iOS原生API调用方式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 点击菜单选项后自动关闭组件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./actionSheet.md}{instruUrl: actionsheet.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var that = null;
var container = document.createElement('div');

var ActionSheet = function (_Component) {
    _inherits(ActionSheet, _Component);

    function ActionSheet() {
        _classCallCheck(this, ActionSheet);

        var _this = _possibleConstructorReturn(this, (ActionSheet.__proto__ || Object.getPrototypeOf(ActionSheet)).call(this));

        _this.state = {
            show: false,
            cancelText: '',
            menu: [],
            title: ''
        };
        that = _this;
        return _this;
    }

    _createClass(ActionSheet, [{
        key: 'hide',
        value: function hide() {
            this.setState({
                show: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                show = _state.show,
                cancelText = _state.cancelText,
                menu = _state.menu,
                title = _state.title;


            var menuItem = menu.map(function (item, i) {
                return _react2.default.createElement(
                    _src2.default,
                    {
                        onTap: function onTap() {
                            _this2.hide();
                            item.onTap();
                        },
                        key: i + 1,
                        touchClass: 'item-touch'
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        item.text
                    )
                );
            });

            var titleItem = !!title ? _react2.default.createElement(
                'div',
                { className: 'title', key: 0 },
                title
            ) : null;
            menuItem.unshift(titleItem);
            return _react2.default.createElement(
                _src4.default,
                {
                    show: show,
                    onMaskTap: function onMaskTap() {
                        return _this2.hide();
                    }
                },
                _react2.default.createElement(
                    'div',
                    { className: 'yo-actionsheet' },
                    _react2.default.createElement(
                        'div',
                        { className: 'menu' },
                        menuItem
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'action' },
                        _react2.default.createElement(
                            _src2.default,
                            { onTap: function onTap() {
                                    return _this2.hide();
                                }, touchClass: 'item-touch' },
                            _react2.default.createElement(
                                'li',
                                {
                                    className: 'item',
                                    onTouchTap: function onTouchTap() {
                                        return _this2.hide();
                                    }
                                },
                                cancelText
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ActionSheet;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(ActionSheet, null), container);

/**
 * @method ActionSheet
 * @param {Object} obj 组件需要的对象参数，主要包含标题、菜单数组、取消按钮文字。
 * @param {Array} obj.menu 菜单选项数组，包含每个选项的文字和回调函数。
 * @param {String} [obj.title] 菜单选项标题，默认为空。
 * @param {String} [obj.cancelText] 组件取消按钮文字，默认'取消'。
 * @description 打开ActionSheet组件。
 */

exports.default = function (_ref) {
    var menu = _ref.menu,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title,
        _ref$cancelText = _ref.cancelText,
        cancelText = _ref$cancelText === undefined ? '取消' : _ref$cancelText;
    return that.setState({
        show: true,
        menu: menu,
        title: title,
        cancelText: cancelText
    });
};