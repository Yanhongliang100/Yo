"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 分组导航组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    onNavItemFocus: function onNavItemFocus() {}
};

var ItemNavBar = function (_Component) {
    _inherits(ItemNavBar, _Component);

    function ItemNavBar(props) {
        _classCallCheck(this, ItemNavBar);

        var _this = _possibleConstructorReturn(this, (ItemNavBar.__proto__ || Object.getPrototypeOf(ItemNavBar)).call(this, props));

        _this.navItemList = [];
        return _this;
    }

    _createClass(ItemNavBar, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.baseY = this.containerDom.getBoundingClientRect().top;
        }

        /**
         * 完全根据title列表的引用是否改变来决定是否render
         * @param props
         * @returns {boolean}
         */

    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(props) {
            return props.list !== this.props.list;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.baseY = this.containerDom.getBoundingClientRect().top;
        }

        /**
         * 导航项目被hover时触发的回调
         * @param item
         */

    }, {
        key: "onNavItemFocus",
        value: function onNavItemFocus(item) {
            var onNavItemFocus = this.props.onNavItemFocus;

            onNavItemFocus(item);
        }

        /**
         * 给导航栏容器绑定的onTouchStart事件
         * @param evt
         */

    }, {
        key: "onNavBarStart",
        value: function onNavBarStart(evt) {
            evt.preventDefault();

            var target = evt.target;

            if (target) {
                var focusedItem = this.getNavItemByDom(target);
                var onNavItemFocus = this.props.onNavItemFocus;

                onNavItemFocus(focusedItem);
            }
        }

        /**
         * 给导航栏容器绑定的move事件,随着move的改变,导航栏项目的hover状态也随着改变并触发对应组件的onNavItemFocus
         * @param evt
         */

    }, {
        key: "onNavBarMove",
        value: function onNavBarMove(evt) {
            evt.preventDefault();

            var offsetY = evt.touches && evt.touches[0].clientY - this.baseY;

            if (!isNaN(offsetY)) {
                var focusedItem = this.getNavItemByOffsetY(offsetY);
                var onNavItemFocus = this.props.onNavItemFocus;

                onNavItemFocus(focusedItem);
            }
        }

        /**
         * 获取当前hover住的导航项
         * @param offsetY
         * @returns {*}
         */

    }, {
        key: "getNavItemByOffsetY",
        value: function getNavItemByOffsetY(offsetY) {
            var _this2 = this;

            var ret = null;
            if (offsetY <= 0) {
                ret = this.navItemList[0];
            } else {
                ret = this.navItemList.find(function (item, i) {
                    var list = _this2.navItemList;
                    if (i < list.length - 1) {
                        return item.top <= offsetY && list[i + 1].top > offsetY;
                    } else if (item.top <= offsetY) {
                        return true;
                    }
                    return false;
                });
            }
            return ret;
        }

        /**
         * 根据dom节点获取对应的导航项组件
         * @param dom
         * @returns {*}
         */

    }, {
        key: "getNavItemByDom",
        value: function getNavItemByDom(dom) {
            return this.navItemList.find(function (item) {
                return item.dom === dom;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                renderItem = _props.renderItem,
                list = _props.list;
            // 每次itemlist可能发生变化时必须重置navItemList

            this.navItemList = [];

            return _react2.default.createElement(
                "ul",
                {
                    className: "index",
                    ref: function ref(dom) {
                        _this3.containerDom = dom;
                    },
                    onTouchStart: function onTouchStart(evt) {
                        return _this3.onNavBarStart(evt);
                    },
                    onTouchMove: function onTouchMove(evt) {
                        return _this3.onNavBarMove(evt);
                    }
                },
                list.map(function (groupTitle, i) {
                    return _react2.default.createElement(
                        "li",
                        {
                            ref: function ref(dom) {
                                if (dom) {
                                    _this3.navItemList[i] = {
                                        dom: dom,
                                        groupKey: groupTitle.groupKey,
                                        top: dom.offsetTop
                                    };
                                }
                            },
                            key: groupTitle.groupKey
                        },
                        renderItem(groupTitle.groupKey)
                    );
                })
            );
        }
    }]);

    return ItemNavBar;
}(_react.Component);

ItemNavBar.propTypes = {
    list: _react.PropTypes.array,
    onNavItemFocus: _react.PropTypes.func,
    renderItem: _react.PropTypes.func
};
exports.default = ItemNavBar;


ItemNavBar.defaultProps = defaultProps;