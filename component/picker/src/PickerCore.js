'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComponentCore2 = require('../../common/ComponentCore');

var _ComponentCore3 = _interopRequireDefault(_ComponentCore2);

var _LoopedArray = require('./LoopedArray');

var _LoopedArray2 = _interopRequireDefault(_LoopedArray);

var _util = require('../../common/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Picker核心逻辑,负责管理Picker的内部状态
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PickerCore = function (_ComponentCore) {
    _inherits(PickerCore, _ComponentCore);

    function PickerCore(_ref) {
        var dataSource = _ref.dataSource,
            value = _ref.value,
            loopedSize = _ref.loopedSize,
            _ref$containerHeight = _ref.containerHeight,
            containerHeight = _ref$containerHeight === undefined ? 150 : _ref$containerHeight,
            _ref$itemHeight = _ref.itemHeight,
            itemHeight = _ref$itemHeight === undefined ? 30 : _ref$itemHeight,
            looped = _ref.looped;

        _classCallCheck(this, PickerCore);

        // static attributes
        // 实际上这三个属性是常量
        var _this = _possibleConstructorReturn(this, (PickerCore.__proto__ || Object.getPrototypeOf(PickerCore)).call(this, 'picker'));

        _this.guid = -1;
        _this.itemHeight = itemHeight;
        _this.selectionHeight = itemHeight;
        _this.loopedSize = loopedSize;
        // mutable states
        // 可以通过父组件render改变
        _this.refresh({ dataSource: dataSource, value: value, containerHeight: containerHeight, looped: looped });
        return _this;
    }

    /**
     * 初始化/重置组件的状态
     * @param dataSource
     * @param value
     * @param containerHeight
     * @param looped
     * @param manually
     */


    _createClass(PickerCore, [{
        key: 'refresh',
        value: function refresh(_ref2) {
            var _this2 = this;

            var dataSource = _ref2.dataSource,
                value = _ref2.value,
                _ref2$containerHeight = _ref2.containerHeight,
                containerHeight = _ref2$containerHeight === undefined ? this.containerHeight : _ref2$containerHeight,
                looped = _ref2.looped,
                _ref2$manually = _ref2.manually,
                manually = _ref2$manually === undefined ? false : _ref2$manually;

            this.looped = looped;
            this.size = looped ? this.loopedSize : dataSource.length;
            this.dataSource = dataSource;
            this.containerHeight = containerHeight;
            this.middlePointY = (containerHeight - this.itemHeight) / 2;

            var visibleSize = Math.floor(this.containerHeight / this.itemHeight * 1.5);
            // 槽的数量,根据容器高度动态计算
            this.visibleSize = this.looped ? visibleSize : dataSource.length;
            // 静态模式下option列表的上下补白,高度为半个容器高度
            this.contentPadding = this.looped ? 0 : this.middlePointY;
            // option列表的容器高度,循环模式下为数据源放大一百万倍乘以option高度(30)
            this.contentHeight = this.itemHeight * this.size + (this.looped ? 0 : 2 * this.contentPadding);
            this.thunks = (0, _util.getArrayByLength)(this.visibleSize).fill(1);
            // 根据数据源生成循环数组
            this.loopedSource = new _LoopedArray2.default(dataSource).map(function (item, index) {
                return Object.assign({}, item, {
                    offset: _this2.contentPadding,
                    looped: _this2.looped,
                    index: index,
                    guid: ++_this2.guid,
                    order: index % _this2.visibleSize
                });
            });
            // 根据value计算初始位置
            var initialPosition = this.getInitialPosition(value, dataSource, this.size, this.itemHeight);
            this.startIndex = initialPosition.index;
            this.offsetY = initialPosition.offsetY;
            this.visibleList = this.getVisibleList(this.offsetY);
            // 如果不是通过构造函数调用(传入了manually参数),触发组件的更新
            if (manually) {
                this.emitEvent('refresh', this.offsetY, this.visibleList, dataSource, this.containerHeight, this.contentHeight, this.thunks);
            }
        }

        /**
         * 设置value,在onChange之后外部组件重置value时调用
         * @param value
         * @param manually
         */

    }, {
        key: 'setValue',
        value: function setValue(value, manually) {
            var itemOnCurrentOffsetY = this.getScrollDestination(this.offsetY).item;
            var targetY = this.offsetY;
            var needRefresh = false;
            // 根据value计算出新的y偏移
            if (value !== itemOnCurrentOffsetY.value) {
                needRefresh = true;
                this.offsetY = targetY = this.getInitialPosition(value, this.dataSource, this.size, this.itemHeight).offsetY;
            }
            // 触发组件更新
            if (manually) {
                this.emitEvent('resetValue', targetY, needRefresh);
            }
        }

        /**
         * 根据偏移y计算出容器内保留的option列表
         * @param offsetY
         * @param looped
         * @returns {Array}
         */

    }, {
        key: 'getVisibleList',
        value: function getVisibleList() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.offsetY;

            this.startIndex = this.getStartIndex(offsetY);
            var endIndex = this.getEndIndex(this.startIndex);
            return this.loopedSource.slice(this.startIndex, endIndex);
        }

        /**
         * 绑定给Scroller的onScroll回调,根据y的变化更新容器内的visibleList
         * @param offsetY
         */

    }, {
        key: 'onScrollTo',
        value: function onScrollTo(offsetY) {
            var prevStartIndex = this.startIndex;

            this.offsetY = offsetY;
            this.visibleList = this.getVisibleList(this.offsetY);

            if (prevStartIndex !== this.startIndex) {
                this.emitEvent('change', this.visibleList);
            }
        }

        /**
         * 绑定给Scroller的onMomentumStart事件回调
         * 这个事件在惯性滚动开始时触发,并会提供惯性滚动的目标Y
         * picker会根据这个Y找到离它最近的一个option,并调整滚动的目的地
         * @param targetY
         */

    }, {
        key: 'onMomentumStart',
        value: function onMomentumStart(targetY) {
            this.emitEvent('momentumStart', this.getScrollDestination(targetY).y);
        }

        /**
         * 根据y计算出距离y最近的option
         * @param y
         * @param itemHeight
         * @param selectionHeight
         * @param contentPadding
         * @param loopedSource
         * @param middlePointY
         * @returns {{y: number, item: Object}}
         */

    }, {
        key: 'getScrollDestination',
        value: function getScrollDestination(y) {
            var itemHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.itemHeight;
            var selectionHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.selectionHeight;
            var contentPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.contentPadding;
            var loopedSource = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.loopedSource;
            var middlePointY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.middlePointY;

            var absY = Math.abs(y),
                middle = middlePointY,
                selectionBarY = absY + middle - contentPadding,
                selectionMiddle = selectionBarY + selectionHeight / 2,
                nearest = Math.ceil(selectionMiddle / itemHeight) - 1,
                targetY = nearest * itemHeight - middle + contentPadding;

            return { y: -targetY, item: loopedSource.getItem(nearest) };
        }

        /**
         * 根据value计算出初始的option
         * @param dataSource
         * @param size
         * @param itemHeight
         * @param value
         * @param looped
         * @param contentPadding
         * @param middlePointY
         * @returns {{offsetY: number, index: number}}
         */

    }, {
        key: 'getInitialPosition',
        value: function getInitialPosition() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.size;
            var itemHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.itemHeight;
            var looped = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.looped;
            var contentPadding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.contentPadding;
            var middlePointY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this.middlePointY;

            var len = dataSource.length,
                proportion = Math.floor(size / len),
                valueIndex = dataSource.findIndex(function (item) {
                return item.value === value;
            }),
                initialIndex = Math.floor(proportion / 2) * dataSource.length + (valueIndex !== -1 ? valueIndex : 0);

            return {
                offsetY: -(initialIndex * itemHeight - middlePointY + contentPadding),
                index: initialIndex
            };
        }
    }, {
        key: 'getPositionByOpt',
        value: function getPositionByOpt(ele) {
            return -(ele.index * this.itemHeight - this.middlePointY + ele.offset);
        }

        /**
         * 获取visibleList的startIndex
         * @param offsetY
         * @param itemHeight
         * @param looped
         * @param visibleSize
         * @returns {number}
         */

    }, {
        key: 'getStartIndex',
        value: function getStartIndex(offsetY) {
            var itemHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.itemHeight;
            var looped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.looped;
            var visibleSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.visibleSize;

            var startIndex = looped ? Math.ceil(-offsetY / itemHeight) - Math.floor(visibleSize / 3) : 0;
            return startIndex > 0 ? startIndex : 0;
        }

        /**
         * 根据startIndex获取visibleList的endIndex
         * @param startIndex
         * @returns {Number}
         */

    }, {
        key: 'getEndIndex',
        value: function getEndIndex(startIndex) {
            return this.looped ? startIndex + this.visibleSize : this.size;
        }
    }]);

    return PickerCore;
}(_ComponentCore3.default);

exports.default = PickerCore;