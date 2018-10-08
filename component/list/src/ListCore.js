'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComponentCore2 = require('../../common/ComponentCore');

var _ComponentCore3 = _interopRequireDefault(_ComponentCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * List核心逻辑,负责管理List组件的内部状态
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ListCore = function (_ComponentCore) {
    _inherits(ListCore, _ComponentCore);

    /**
     * @param dataSource 数据源
     * @param offsetY 列表的初始Y偏移
     * @param infinite 是否是无穷列表
     * @param itemHeight 列表项高度
     * @param visibleSize 保留在列表容器中列表项的数组
     * @description 构造函数,会通过调用refresh方法进行初始化
     */
    function ListCore(_ref) {
        var dataSource = _ref.dataSource,
            _ref$offsetY = _ref.offsetY,
            offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY,
            _ref$infinite = _ref.infinite,
            infinite = _ref$infinite === undefined ? true : _ref$infinite,
            itemHeight = _ref.itemHeight,
            _ref$infiniteSize = _ref.infiniteSize,
            infiniteSize = _ref$infiniteSize === undefined ? 12 : _ref$infiniteSize,
            _ref$staticSectionHei = _ref.staticSectionHeight,
            staticSectionHeight = _ref$staticSectionHei === undefined ? 0 : _ref$staticSectionHei;

        _classCallCheck(this, ListCore);

        // 静态属性
        // 这些属性不会随着父组件render改变
        var _this = _possibleConstructorReturn(this, (ListCore.__proto__ || Object.getPrototypeOf(ListCore)).call(this, 'list'));

        _this.itemHeight = itemHeight;
        // 保存列表项定位信息的表,List组件不定高模式的核心数据结构
        _this.positionMap = {};
        // 在refresh中设置的属性可以通过父组件的render改变
        _this.refresh({
            dataSource: dataSource,
            refreshAll: false,
            infiniteSize: infiniteSize,
            staticSectionHeight: staticSectionHeight,
            offsetY: offsetY,
            infinite: infinite
        });
        return _this;
    }

    /**
     * @param ds
     * @param refreshAll
     * @param visibleSize
     * @param offsetY
     * @param infinite
     * @param startIndex
     * @returns {ListCore}
     * @description 设置实例属性, 在构造函数中被调用,也会在组件的componentWillReceiveProps回调中调用
     * 可以根据props初始化/重置组件的状态
     */


    _createClass(ListCore, [{
        key: 'refresh',
        value: function refresh(_ref2) {
            var _ref2$dataSource = _ref2.dataSource,
                dataSource = _ref2$dataSource === undefined ? this.dataSource : _ref2$dataSource,
                _ref2$refreshAll = _ref2.refreshAll,
                refreshAll = _ref2$refreshAll === undefined ? false : _ref2$refreshAll,
                _ref2$infiniteSize = _ref2.infiniteSize,
                infiniteSize = _ref2$infiniteSize === undefined ? this.visibleSize : _ref2$infiniteSize,
                _ref2$staticSectionHe = _ref2.staticSectionHeight,
                staticSectionHeight = _ref2$staticSectionHe === undefined ? this.staticSectionHeight : _ref2$staticSectionHe,
                _ref2$offsetY = _ref2.offsetY,
                offsetY = _ref2$offsetY === undefined ? this.offsetY : _ref2$offsetY,
                _ref2$infinite = _ref2.infinite,
                infinite = _ref2$infinite === undefined ? this.infinite : _ref2$infinite;

            if (!Array.isArray(dataSource)) {
                if (typeof dataSource.toArray === 'function') {
                    dataSource = dataSource.toArray();
                } else {
                    throw new Error('yo-list: dataSource必须为数组或者Immutable List!');
                }
            }

            if (!dataSource.length) {
                throw new Error('yo-list: dataSource不能为空数组!');
            }

            this.WINDOW_HEIGHT = window.screen.height;
            this.infinite = infinite;
            this.VISIBLE_SIZE = infiniteSize;
            this.dataSource = this.renderDataSource(dataSource, refreshAll);
            this.isHeightFixed = this.ifHeightFixed();
            this.direction = this.getDirection(offsetY);
            this.offsetY = offsetY;
            this.startIndex = this.refreshStartIndexByOffsetY(offsetY);
            this.visibleList = this.getVisibleList(offsetY);
            this.staticSectionHeight = staticSectionHeight;
            this.totalHeight = this.getTotalHeight();

            this.emitChange();

            return this;
        }

        /**
         * @param dataSource
         * @returns {boolean}
         * 判断数据源中的元素是否都被计算出(设置了)高度
         */

    }, {
        key: 'ifHeightFixed',
        value: function ifHeightFixed() {
            var _this2 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.every(function (item) {
                return !!_this2.getAttr(item.srcData, 'height');
            }) || !!this.itemHeight || !this.infinite;
        }

        /**
         * @returns {number}
         * 返回一个guid
         */

    }, {
        key: 'getGuid',
        value: function getGuid() {
            return ++ListCore.guid;
        }

        /**
         * @param offsetY
         * @returns {string}
         * 根据传入的offsetY计算出组件滚动的方向
         */

    }, {
        key: 'getDirection',
        value: function getDirection(offsetY) {
            return offsetY - this.offsetY >= 0 ? 'down' : 'up';
        }

        /**
         * @param offsetY
         * @returns {number}
         * 根据传入的offsetY计算startIndex,startIndex被用来计算visibleList(无穷模式中保留在容器中的列表项的数组)
         */

    }, {
        key: 'refreshStartIndexByOffsetY',
        value: function refreshStartIndexByOffsetY(y) {
            var offsetY = y - window.screen.height / 5;

            if (this.infinite && this.isHeightFixed) {
                for (var i = 0; i < this.dataSource.length; i++) {
                    var item = this.dataSource[i];
                    var itemPosData = this.getItemPositionData(item);
                    if (i === 0 && itemPosData.height > offsetY) {
                        return i;
                    } else if (i > 0) {
                        var prev = this.dataSource[i - 1];
                        var prevPosData = this.getItemPositionData(prev);
                        if (prevPosData._translateY < offsetY && prevPosData._translateY >= offsetY) {
                            return i;
                        }
                    }
                }
            } else if (this.infinite) {
                return this.startIndex ? this.startIndex : 0;
            }

            return 0;
        }

        /**
         * @param offsetY
         * @returns {ListCore}
         * 在列表滚动时,根据offsetY更新visibleList
         */

    }, {
        key: 'onScrollTo',
        value: function onScrollTo(offsetY, manually) {
            this.direction = this.getDirection(offsetY);
            this.offsetY = offsetY;
            if (manually) {
                this.startIndex = 0;
            }
            var cachedIndex = this.startIndex;
            if (this.infinite) {
                this.visibleList = this.getVisibleList(offsetY);
                // 只有当visibleList里面的内容真正发生变化的时候才触发onchange
                // 这样可以确保setState调用次数最少
                if (this.startIndex !== cachedIndex || this.startIndex === 0 && this.offsetY === 0 || manually) {
                    this.emitChange();
                }
            }

            return this;
        }
    }, {
        key: 'getItemPositionData',
        value: function getItemPositionData(item) {
            var key = this.getAttr(item, 'key');
            return item._type === 'groupTitle' ? item : this.positionMap[key];
        }
    }, {
        key: 'setItemPositionData',
        value: function setItemPositionData(item, attr) {
            // grouptitle做特殊处理,因为grouptitle是grouplist组件内部的数据对象,所以不会修改到源数据
            // 与此同时，grouplist需要获取到_translateY这些信息，因此也只能在原来的数据对象上修改
            if (item._type === 'groupTitle') {
                Object.assign(item, attr);
            } else if (this.positionMap[item.key]) {
                Object.assign(this.positionMap[item.key], attr);
            }
        }

        /**
         * @param ds
         * @param refreshAll
         * @returns {Array}
         * 处理数据源
         * 为每个元素的在pos表中的项添加_order(无穷模式下该列表项对应的槽的index),_resolved(是否已经计算出位置),_index(在数据源中的位置)
         * _translateY(无穷列表中元素的translateY)和_bottom(列表项的bottom)
         */

    }, {
        key: 'renderDataSource',
        value: function renderDataSource(ds) {
            var _this3 = this;

            var refreshAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return ds.map(function (ditem, i) {
                var key = _this3.getAttr(ditem, 'key');
                var renderedItem = {};

                if (key == null) {
                    if (_this3.infinite) {
                        throw new Error('infinite模式的列表数据源的每一项必须有key属性。');
                    } else {
                        key = _this3.getGuid();
                        if (process.env.NODE_ENV === 'dev') {
                            console.warn('Yo-List:列表项没有key属性,将自动添加自增的key。这会使得列表在更新时出现大量的不必要的dom操作，请为每一个列表项指定一个唯一的key。');
                        }
                    }
                }

                // 区分groupTitle和item，因为groupTitle是组件添加的，不会影响到源数据，所以可以直接在上面增加属性
                renderedItem = ditem._type !== 'groupTitle' ? {
                    // srcData指向源数据
                    srcData: ditem,
                    key: key,
                    _index: i,
                    _type: 'item'
                } : Object.assign(ditem, { srcData: ditem, _index: i }); // 这里给title增加了一个指向自己的指针srcData，这是为了兼容其他普通item的数据格式，而不是在使用它的地方做各种判断

                if (refreshAll) {
                    _this3.setItemPositionData(renderedItem, { _bottom: null, _translateY: null, _order: null });
                }

                var itemPosData = _this3.getItemPositionData(renderedItem);
                if (!itemPosData) {
                    itemPosData = _this3.positionMap[renderedItem.key] = {};
                }

                var itemHeight = _this3.getAttr(ditem, 'height');
                var noHeightIdentified = _this3.itemHeight == null && itemHeight == null && itemPosData.height == null;
                if (_this3.infinite) {
                    // 设置height,_order,_resolved和_index
                    // 如果这个item具有高度,则直接设为resolved
                    _this3.setItemPositionData(renderedItem, {
                        height: itemHeight || itemPosData.height || _this3.itemHeight,
                        _order: i % _this3.VISIBLE_SIZE,
                        _resolved: _this3.infinite && !noHeightIdentified,
                        _index: i
                    });
                    // 即使这个元素高度确定,之前一个高度为null,也无法算出translateY和bottom
                    // 此处再次验证之前一个元素是否为resolve
                    if (i > 0) {
                        var prevItemPosData = _this3.getItemPositionData(ds[i - 1]);
                        if (!prevItemPosData._resolved) {
                            _this3.setItemPositionData(renderedItem, { _resolved: false });
                        }
                    }
                    // 第一个item,直接设置_translateY为0
                    if (i === 0) {
                        _this3.setItemPositionData(renderedItem, { _translateY: 0 });
                    }
                    // 之后的所有item,如果有height,设置它们的_translateY为前一个元素的bottom
                    // 设置它们的bottom为_translateY+height
                    if (itemPosData._resolved && !itemPosData._bottom) {
                        var _translateY = i === 0 ? 0 : _this3.getItemPositionData(ds[i - 1])._bottom;
                        var _bottom = _translateY + itemPosData.height;
                        _this3.setItemPositionData(renderedItem, {
                            _translateY: _translateY,
                            _bottom: _bottom
                        });
                    } else if (!itemPosData._resolved) {
                        // 不定高的情况
                        if (i > 0) {
                            var _prevItemPosData = _this3.getItemPositionData(ds[i - 1]);
                            if (_prevItemPosData._bottom) {
                                _this3.setItemPositionData(renderedItem, { _translateY: _prevItemPosData._bottom });
                            }
                        }
                    }
                }

                return renderedItem;
            });
        }

        /**
         * @param i
         * @param borderY
         * @param dataSource
         * @returns {boolean}
         * 根据offsetY计算出刚好跨过offsetY的元素(top在y之上,bottom在y之下),或者是一个没有完成定位的元素
         */

    }, {
        key: 'isBorderItem',
        value: function isBorderItem(i, borderY) {
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            var itemPosData = this.getItemPositionData(dataSource[i]);
            return itemPosData._resolved && itemPosData._bottom >= borderY && itemPosData._translateY <= borderY || !itemPosData._resolved;
        }

        /**
         * @param startY
         * @param startIndex
         * @param direction
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Number}
         * 根据当前滚动的方向和y计算出startIndex
         * 缓存了当前的startIndex,这样可以将查找的开销从O(n)降低到O(1),在处理大列表的时候可以提升性能
         */

    }, {
        key: 'getStartItemIndex',
        value: function getStartItemIndex(startY) {
            var sIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.startIndex;
            var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.direction;
            var dataSource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.dataSource;
            var VISIBLE_SIZE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.VISIBLE_SIZE;

            var len = dataSource.length;
            var startIndex = sIndex;
            // 从保存的startIndex开始循环,根据当前滚动的方向的不同,i相应增加/减少
            // 这样可以将查找的时间复杂度从线性降低到常量
            if (direction === 'down' || startIndex === 0) {
                for (var i = startIndex; i < len; i++) {
                    if (this.isBorderItem(i, startY)) {
                        startIndex = i;
                        break;
                    }
                }
            } else {
                for (var _i = startIndex; _i >= 0; _i--) {
                    if (this.isBorderItem(_i, startY)) {
                        startIndex = _i;
                        break;
                    }
                }
            }

            if (startIndex > dataSource.length - VISIBLE_SIZE) {
                startIndex = dataSource.length - VISIBLE_SIZE > 0 ? dataSource.length - VISIBLE_SIZE : 0;
            }

            return startIndex;
        }

        /**
         * @param startIndex
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Number}
         * 根据startIndex算出endIndex
         */

    }, {
        key: 'getEndItemIndex',
        value: function getEndItemIndex(startIndex) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;
            var VISIBLE_SIZE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.VISIBLE_SIZE;

            return startIndex + VISIBLE_SIZE > dataSource.length ? dataSource.length : startIndex + VISIBLE_SIZE;
        }

        /**
         * @param offsetY
         * @param sIndex
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Array}
         * 根据offsetY算出visibleList
         */

    }, {
        key: 'getVisibleList',
        value: function getVisibleList() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.offsetY;
            var sIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            offsetY = offsetY - this.staticSectionHeight;
            var ret = null;

            if (this.infinite) {
                var startY = offsetY - this.WINDOW_HEIGHT / 5;
                startY = startY > 0 ? startY : 0;
                var startIndex = sIndex === null ? this.getStartItemIndex(startY) : sIndex,
                    endIndex = this.getEndItemIndex(startIndex);

                ret = [];
                for (var i = startIndex; i < endIndex; i++) {
                    var item = this.dataSource[i];
                    ret.push(_extends({}, item, this.getItemPositionData(item)));
                }
                this.startIndex = startIndex;
            } else {
                ret = dataSource.slice();
            }

            return ret;
        }

        /**
         * @param dataSource
         * @returns {Object}
         * 获取数据源中第一个还没有resolve的元素
         */

    }, {
        key: 'getFirstNotResolvedItemIndex',
        value: function getFirstNotResolvedItemIndex() {
            var _this4 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.findIndex(function (ditem, i) {
                if (i > 0) {
                    var itemPosData = _this4.getItemPositionData(ditem);
                    var prevItemPosData = _this4.getItemPositionData(dataSource[i - 1]);
                    return !itemPosData._resolved && prevItemPosData._resolved;
                }
                return false;
            });
        }

        /**
         * @param key
         * @param dataSource
         * @returns {Number}
         * 根据key返回一个数据源中的元素
         */

    }, {
        key: 'getItemIndexByKey',
        value: function getItemIndexByKey(key) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            return dataSource.findIndex(function (item) {
                return item.key === key;
            });
        }

        /**
         * @param notResolvedItemIndex
         * @param dataSource
         * 更新一个未定位元素的_translateY,它是前一个元素的_bottom
         */

    }, {
        key: 'updateTranslateY',
        value: function updateTranslateY(notResolvedItemIndex) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            var notResolvedItem = dataSource[notResolvedItemIndex];

            if (notResolvedItem) {
                var prevItemIndex = notResolvedItemIndex - 1;
                var prevItem = dataSource[prevItemIndex];
                var prevItemPosData = this.getItemPositionData(prevItem);

                if (prevItemPosData && prevItemPosData._resolved) {
                    this.setItemPositionData(notResolvedItem, { _translateY: prevItemPosData._bottom });
                    // 同时也需要更新visibleList里面对应item的定位信息
                    var visibleListItemToBeUpdated = this.visibleList.find(function (item) {
                        return item.key === notResolvedItem.key;
                    });
                    if (visibleListItemToBeUpdated) {
                        Object.assign(visibleListItemToBeUpdated, this.getItemPositionData(notResolvedItem));
                    }
                }
            }
        }

        /**
         * @param key
         * @param height
         * @param dataSource
         * @returns {ListCore}
         * 不定高模式的核心逻辑,定位一个尚未定位的列表项
         * 在列表项的componentDidUpdate和Mount中被调用,传入已经渲染好的列表项的dom高度,然后更新数据源中对应元素的高度并计算它的定位
         * 在该元素完成定位后,渲染下一个未被定位的列表项,并重复以上逻辑,直到visibleList中所有的项都完成定位
         */

    }, {
        key: 'resolveItem',
        value: function resolveItem(key, height) {
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            var targetIndex = this.getItemIndexByKey(key);
            var targetItem = this.dataSource[targetIndex];
            var _translateY = void 0;

            if (targetIndex > 0) {
                var prevItemPosData = this.getItemPositionData(dataSource[targetIndex - 1]);
                _translateY = prevItemPosData._bottom;
            } else {
                _translateY = 0;
            }

            if (_translateY != null) {
                var _bottom = _translateY + height;
                var _resolved = true;
                this.setItemPositionData(targetItem, { _translateY: _translateY, _bottom: _bottom, _resolved: _resolved, height: height });
                this.visibleList = this.getVisibleList();
                this.totalHeight += height;
                this.updateTranslateY(this.getFirstNotResolvedItemIndex());
                this.emitChange();
            }

            return this;
        }

        /**
         * @param dataSource
         * @returns {Array}
         * 计算列表中所有项的高度,用来refresh Scroller
         */

    }, {
        key: 'getTotalHeight',
        value: function getTotalHeight() {
            var _this5 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.reduce(function (acc, item) {
                var ret = acc;
                var itemPosData = _this5.getItemPositionData(item);
                ret += itemPosData._resolved ? itemPosData.height : 0;
                return ret;
            }, 0) + this.staticSectionHeight;
        }

        /**
         * @returns {ListCore}
         * 触发组件change事件,组件收到change事件后会执行setState
         */

    }, {
        key: 'emitChange',
        value: function emitChange() {
            this.emitEvent('change', this.visibleList, this.totalHeight);
            return this;
        }
    }]);

    return ListCore;
}(_ComponentCore3.default);

ListCore.guid = -1;
exports.default = ListCore;