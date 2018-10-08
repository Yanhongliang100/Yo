'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../../common/tapEventPluginInit.js');

var _drag = require('../../common/drag.js');

var _drag2 = _interopRequireDefault(_drag);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component SwipeMenu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 滑动菜单组件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 支持向右或向左单向滑动，显示菜单按钮。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 默认拖动距离超过菜单按钮的一半时，组件自动打开，否则组件回到关闭状态。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 组件拖动条可拖离足够远位置。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 组件处于开启状态时，下次拖动不作响应，且组件会自动关闭，可通过轻点方式来关闭组件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./swipeMenu.md}{instruUrl: swipemenu.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    action: [],
    direction: 'left',
    extraClass: '',
    disable: false,
    onTouchStart: function onTouchStart() {},
    onTouchMove: function onTouchMove() {},
    onTouchEnd: function onTouchEnd() {},
    onOpen: function onOpen() {},
    onClose: function onClose() {}
};

var propTypes = {
    /**
     * @property action
     * @description 组件打开状态显示菜单内容，额外类名，回调函数
     *
     * ```
     * PropTypes.arrayOf(
     *     PropTypes.shape({
     *         text: PropTypes.string.isRequired,
     *         className: PropTypes.string,
     *         onTap: PropTypes.func.isRequired
     *     })
     * )
     * ```
     * @type Array
     * @default []
     */
    action: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
        className: _react.PropTypes.string,
        onTap: _react.PropTypes.func.isRequired
    })),
    /**
     * @property open
     * @description 默认组件是否打开
     * @type Bool
     * @default false
     */
    open: _react.PropTypes.bool,
    /**
     * @property direction
     * @description 组件可以拖动的方向
     * @type Enum {'left', 'right'}
     * @default left
     */
    direction: _react.PropTypes.oneOf(['left', 'right']),
    /**
     * @property extraClass
     * @description 组件的额外样式类
     * @type String
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property disable
     * @description 组件是否不可用
     * @type Bool
     * @default false
     */
    disable: _react.PropTypes.bool,
    /**
     * @method onTouchStart
     * @description touchStart时期触发的回调
     * @type Function
     * @default () => {}
     */
    onTouchStart: _react.PropTypes.func,
    /**
     * @method onTouchMove
     * @description touchMove时期触发的回调
     * @type Function
     * @default () => {}
     */
    onTouchMove: _react.PropTypes.func,
    /**
     * @method onTouchEnd
     * @description touchEnd时期触发的回调
     * @type Function
     * @default () => {}
     */
    onTouchEnd: _react.PropTypes.func,
    /**
     * @method onOpen
     * @description 组件打开时期触发的回调
     * @type Function
     * @default () => {}
     */
    onOpen: _react.PropTypes.func,
    /**
     * @method onClose
     * @description 组件关闭时期触发的回调
     * @type Function
     * @default () => {}
     */
    onClose: _react.PropTypes.func,
    children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array, _react.PropTypes.string, _react.PropTypes.number])
};

var SwipeMenu = function (_Component) {
    _inherits(SwipeMenu, _Component);

    function SwipeMenu(props) {
        _classCallCheck(this, SwipeMenu);

        var _this = _possibleConstructorReturn(this, (SwipeMenu.__proto__ || Object.getPrototypeOf(SwipeMenu)).call(this, props));

        _this.drag = null;

        // 标志， 组件是否在返回， 处理不能同时返回又向外拖的情况
        _this.isBack = false;
        _this.actBtn = null;

        // action菜单按钮的宽度
        _this.actBtnWidth = 0;
        _this.startX = 0;
        _this.timer = null;
        return _this;
    }

    _createClass(SwipeMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                open = _props.open,
                direction = _props.direction;

            this.actBtnWidth = this.actBtn.offsetWidth;
            this.dragEvt = new _drag2.default({ node: this.drag, aniClass: 'transition' });
            this.reset(open, direction);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.reset(nextProps.open, this.props.direction);
        }

        /**
         * 获取拖动的距离， 作为common/drag.js 中dragMove的Middleware
         * 主要处理超过最大值时缓慢拖动效果
         * @param distanceX {Number} 实际拖动距离， 由drag.js传入
         * @returns {*} 组件translate距离
         */

    }, {
        key: 'getMoveDistance',
        value: function getMoveDistance(distanceX) {
            if (this.props.direction === 'right' && distanceX > 0) {
                if (distanceX > this.actBtnWidth * 1.5) {
                    return this.actBtnWidth + 0.35 * distanceX;
                }
                return distanceX;
            }
            if (this.props.direction === 'left' && distanceX < 0) {
                if (Math.abs(distanceX) > this.actBtnWidth * 1.5) {
                    return -this.actBtnWidth + 0.35 * distanceX;
                }
                return distanceX;
            }
            return 0;
        }

        /**
         * 组件最终拖动的距离， 由此决定组件最终状态
         * 作为common/drag.js里的dragEnd的middleware
         * @param distanceX dragEnd中实际拖动的距离
         * @returns {*} 组件最后的translate距离
         */

    }, {
        key: 'getEndDistance',
        value: function getEndDistance(distanceX) {
            var dir = this.props.direction;
            var max = this.actBtnWidth;
            if (dir === 'left' && distanceX > 0 || dir === 'right' && distanceX < 0) {
                this.props.onClose();
                return 0;
            }
            var full = dir === 'left' ? -max : max;
            if (Math.abs(distanceX) > max / 2) {
                this.isBack = true;
                this.props.onOpen();
                return full;
            }
            this.props.onClose();
            return 0;
        }

        /**
         * reset 根据open的参数，确定组件关闭
         * @param open {boolean} 是否开启
         * @param direction {string} 组件拖动的方向
         */

    }, {
        key: 'reset',
        value: function reset(open, direction) {
            var resetX = 0;
            // 为传open， 不需要执行
            if (open === undefined) {
                return;
            }
            if (open) {
                resetX = direction === 'right' ? this.actBtnWidth : -this.actBtnWidth;
            }
            if (this.dragEvt) this.dragEvt.setMove(resetX);
            this.isBack = !!resetX;
            (0, _drag.setTransform)({ node: this.drag, distanceX: resetX });
        }

        /**
         * 组件的状态转换过程， 是否清楚过渡动画， 完毕之后再加上
         * @param toStatus {Boolean} 目的状态是否是打开状态， true => open
         * @param isClearTransition {Boolean} 是否清楚组件动画
         */

    }, {
        key: 'toggle',
        value: function toggle(toStatus, isClearTransition) {
            var _this2 = this;

            if (!isClearTransition) {
                this.reset(toStatus, this.props.direction);
                return;
            }
            if (this.drag) this.drag.className = 'front ';
            this.reset(toStatus, this.props.direction);
            this.timer = setTimeout(function () {
                if (_this2.drag) _this2.drag.className = 'front transition';
            }, 300);
        }

        /**
         * @method open
         * @description 打开SwipeMenu，能够接收一个参数，表示是否有过渡动画效果。
         * @param {Boolean} isClearTransition
         */

    }, {
        key: 'open',
        value: function open() {
            var _this3 = this;

            var isClearTransition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.isBack = true;
            this.toggle(true, isClearTransition);
            setTimeout(function () {
                _this3.props.onOpen();
            }, isClearTransition ? 300 : 0);
        }

        /**
         * @method close
         * @description 关闭SwipeMenu，能够接收一个参数，表示是否有过渡动画效果。
         * @param {Boolean} isClearTransition
         */

    }, {
        key: 'close',
        value: function close() {
            var _this4 = this;

            var isClearTransition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.isBack = false;
            this.toggle(false, isClearTransition);
            // 动画结束时触发onClose
            setTimeout(function () {
                _this4.props.onClose();
            }, !isClearTransition ? 300 : 0);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _props2 = this.props,
                action = _props2.action,
                extraClass = _props2.extraClass,
                disable = _props2.disable,
                direction = _props2.direction,
                _onTouchStart = _props2.onTouchStart,
                _onTouchMove = _props2.onTouchMove,
                _onTouchEnd = _props2.onTouchEnd;

            var actionClass = direction === 'left' ? '' : 'action-start';
            var actionElement = (0, _react.isValidElement)(action) ? action : action.map(function (item, i) {
                item.className = item.className || '';
                return _react2.default.createElement(
                    'span',
                    {
                        className: (0, _classnames2.default)('item', item.className),
                        key: i,
                        onTouchTap: function onTouchTap() {
                            return item.onTap(_this5);
                        }
                    },
                    item.text
                );
            });
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('yo-swipemenu', extraClass) },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'front transition',
                        ref: function ref(_ref) {
                            _this5.drag = _ref;
                        },
                        onTouchStart: function onTouchStart(evt) {
                            if (disable) {
                                return;
                            }
                            _this5.dragEvt.dragStart(evt);
                            if (Math.abs(_this5.dragEvt.getMove()) > _this5.actBtnWidth / 2) {
                                _this5.isBack = true;
                                _this5.drag.className += 'transition';
                                _this5.dragEvt.refreshDrag();
                            }
                            _onTouchStart();
                        },
                        onTouchMove: function onTouchMove(evt) {
                            if (disable || _this5.isBack) {
                                return;
                            }
                            _this5.dragEvt.dragMove(evt, _this5.getMoveDistance.bind(_this5));
                            _onTouchMove();
                        },
                        onTouchEnd: function onTouchEnd(evt) {
                            if (disable || _this5.isBack) {
                                _this5.isBack = false;
                                return;
                            }
                            _onTouchEnd();
                            _this5.dragEvt.dragEnd(evt, _this5.getEndDistance.bind(_this5));
                        },
                        onTouchCancel: function onTouchCancel(evt) {
                            return _this5.dragEvt.dragCancel(evt);
                        }
                    },
                    this.props.children
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('action', actionClass),
                        ref: function ref(_ref2) {
                            _this5.actBtn = _ref2;
                        }
                    },
                    actionElement
                )
            );
        }
    }]);

    return SwipeMenu;
}(_react.Component);

exports.default = SwipeMenu;


SwipeMenu.defaultProps = defaultProps;
SwipeMenu.propTypes = propTypes;