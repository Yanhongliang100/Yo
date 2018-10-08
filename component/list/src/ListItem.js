'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../common/util');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _src = require('../../touchable/src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 列表项组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var _class = function (_Component) {
    _inherits(_class, _Component);

    /**
     * key和translateY在shouldComponentUpdate中会被使用
     * 将会根据nextProps.item中对应的值,来决定是否render
     * @param props
     */
    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.key = props.item.key;
        _this.translateY = props.item._translateY;
        return _this;
    }

    _createClass(_class, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { offsetY: this.props.item._translateY, itemRef: this };
        }

        /**
         * 不定高的核心逻辑,在dom rendered以后更新对应列表项的定位信息,并渲染出下一个未经定位的列表项,直到填满visibleList的size
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var isHeightFixed = this.props.listModel.isHeightFixed;
            // 不定高无穷列表的容器是flex-box的话, 浏览器会先渲染dom然后调整高度, 这时候取到的高度不准
            // setTimeout是无奈之举，确实没有想到更好的办法，因为这个调整高度的时机用js根本无法准确获取

            if (isHeightFixed) {
                this.updateItemHeightWhenDomRendered();
            } else {
                this.domNode.style.visibility = 'hidden';
                setTimeout(function () {
                    _this2.updateItemHeightWhenDomRendered();
                    _this2.domNode.style.visibility = 'visible';
                }, _util.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT);
            }
        }

        /**
         * 根据之前的key和_translateY和接收到的props.item中的对应值,决定是否render
         * 使用者定义的shouldItemUpdate可以接收到shouldComponentUpdate的结果,并返回一个新的结果
         * @param nextProps
         * @returns {Bool}
         */

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            var listModel = nextProps.listModel,
                shouldItemUpdate = nextProps.shouldItemUpdate;

            var ret = true;
            // 当容器内部item的key和translateY发生变化时重新render
            if (listModel.infinite && this.key === nextProps.item.key && this.translateY === nextProps.item._translateY) {
                ret = false;
            }

            this.key = nextProps.item.key;
            this.translateY = nextProps.item._translateY;

            if (shouldItemUpdate && !ret) {
                return shouldItemUpdate(nextProps.item.srcData, this.props.item.srcData);
            }
            return ret;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateItemHeightWhenDomRendered();
        }

        /**
         * 不定高模式的无穷列表需要在列表项渲染后更新它的位置信息
         */

    }, {
        key: 'updateItemHeightWhenDomRendered',
        value: function updateItemHeightWhenDomRendered() {
            var _props = this.props,
                item = _props.item,
                listModel = _props.listModel,
                onListItemUpdate = _props.onListItemUpdate;


            if (!item._resolved && item._translateY !== undefined && listModel.infinite && !listModel.isHeightFixed) {
                listModel.resolveItem(item.key, this.domNode.offsetHeight);
            }

            onListItemUpdate(item.srcData, this.domNode);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                renderItem = _props2.renderItem,
                item = _props2.item,
                onItemTap = _props2.onItemTap,
                listModel = _props2.listModel,
                itemTouchClass = _props2.itemTouchClass,
                itemExtraClass = _props2.itemExtraClass,
                onItemTouchStart = _props2.onItemTouchStart;

            var transform = 'translate(0,' + item._translateY + 'px) translateZ(0px)';
            var infiniteStyle = {
                WebkitTransform: transform,
                transform: transform,
                height: item.height,
                position: 'absolute',
                top: 0
            };
            var basicProps = {
                ref: function ref(dom) {
                    _this3.domNode = dom;
                },
                style: listModel.infinite ? infiniteStyle : null
            };
            var additionalProps = {
                className: (0, _classnames2.default)(itemExtraClass(item.srcData, item._index), item._type !== 'groupTitle' ? 'item' : 'group-title label')
            };

            return _react2.default.createElement(
                _src2.default,
                {
                    internalUse: true,
                    onTap: onItemTap,
                    touchClass: itemTouchClass(item.srcData, item._index),
                    onTouchStart: function onTouchStart(evt) {
                        onItemTouchStart(item.srcData, item._index, evt);
                    }
                },
                _react2.default.createElement(
                    'li',
                    Object.assign({}, basicProps, additionalProps),
                    renderItem(item.srcData, item._index)
                )
            );
        }
    }]);

    return _class;
}(_react.Component);

_class.propTypes = {
    item: _react.PropTypes.object,
    listModel: _react.PropTypes.object,
    itemTouchClass: _react.PropTypes.func,
    itemExtraClass: _react.PropTypes.func,
    scroller: _react.PropTypes.object,
    onItemTouchStart: _react.PropTypes.func,
    renderItem: _react.PropTypes.func,
    onItemTap: _react.PropTypes.func,
    onListItemUpdate: _react.PropTypes.func
};
_class.childContextTypes = {
    offsetY: _react.PropTypes.number,
    itemRef: _react.PropTypes.object
};
_class.defaultProps = {
    onListItemUpdate: function onListItemUpdate() {}
};
exports.default = _class;