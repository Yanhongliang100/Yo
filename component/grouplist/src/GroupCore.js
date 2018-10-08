'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComponentCore2 = require('../../common/ComponentCore');

var _ComponentCore3 = _interopRequireDefault(_ComponentCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Grouplist核心逻辑,负责管理Grouplist组件的状态
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var GroupCore = function (_ComponentCore) {
    _inherits(GroupCore, _ComponentCore);

    /**
     * 构造函数
     * @param dataSource 数据源,将会被插入一些title对象
     * @param itemHeight 列表项高度
     * @param titleHeight title高度
     * @param sort group排序规则
     * @param infinite 是否开启无穷模式
     * @param offsetY 初始偏移
     */
    function GroupCore(_ref) {
        var dataSource = _ref.dataSource,
            _ref$itemHeight = _ref.itemHeight,
            itemHeight = _ref$itemHeight === undefined ? null : _ref$itemHeight,
            _ref$staticSectionHei = _ref.staticSectionHeight,
            staticSectionHeight = _ref$staticSectionHei === undefined ? 0 : _ref$staticSectionHei,
            titleHeight = _ref.titleHeight,
            sort = _ref.sort,
            infinite = _ref.infinite,
            _ref$offsetY = _ref.offsetY,
            offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY,
            _ref$isTitleStatic = _ref.isTitleStatic,
            isTitleStatic = _ref$isTitleStatic === undefined ? true : _ref$isTitleStatic,
            _ref$titleOffset = _ref.titleOffset,
            titleOffset = _ref$titleOffset === undefined ? 0 : _ref$titleOffset;

        _classCallCheck(this, GroupCore);

        // stickyHeader是一个内部状态,保存了当前吸顶title的位置和key
        var _this = _possibleConstructorReturn(this, (GroupCore.__proto__ || Object.getPrototypeOf(GroupCore)).call(this, 'grouplist'));

        _this.stickyHeader = null;
        _this.isTitleStatic = isTitleStatic;
        // 调用initialize过程,这个过程在componentWillReceiveProps时也会被调用,可以init/reset组件的状态
        _this.initialize({
            offsetY: offsetY,
            dataSource: dataSource,
            sort: sort,
            infinite: infinite,
            staticSectionHeight: staticSectionHeight,
            itemHeight: itemHeight,
            titleHeight: titleHeight,
            titleOffset: titleOffset
        });
        return _this;
    }

    /**
     * 初始化/重置组件的状态
     * @param offsetY
     * @param dataSource
     * @param sort
     * @param infinite
     * @param itemHeight
     * @param titleHeight
     */


    _createClass(GroupCore, [{
        key: 'initialize',
        value: function initialize(_ref2) {
            var _this2 = this;

            var offsetY = _ref2.offsetY,
                dataSource = _ref2.dataSource,
                _ref2$sort = _ref2.sort,
                sort = _ref2$sort === undefined ? this.sortFunc : _ref2$sort,
                _ref2$infinite = _ref2.infinite,
                infinite = _ref2$infinite === undefined ? this.infinite : _ref2$infinite,
                _ref2$staticSectionHe = _ref2.staticSectionHeight,
                staticSectionHeight = _ref2$staticSectionHe === undefined ? null : _ref2$staticSectionHe,
                _ref2$itemHeight = _ref2.itemHeight,
                itemHeight = _ref2$itemHeight === undefined ? this.itemHeight : _ref2$itemHeight,
                _ref2$titleHeight = _ref2.titleHeight,
                titleHeight = _ref2$titleHeight === undefined ? this.titleHeight : _ref2$titleHeight,
                _ref2$titleOffset = _ref2.titleOffset,
                titleOffset = _ref2$titleOffset === undefined ? this.titleOffset : _ref2$titleOffset;

            this.infinite = infinite;
            this.itemHeight = itemHeight;
            this.titleHeight = titleHeight;
            this.titleOffset = titleOffset;
            this.currentGroup = {};
            this.dataSource = this.renderData(dataSource, itemHeight, titleHeight, sort);
            this.staticSectionHeight = staticSectionHeight;
            this.groupTitles = this.getTitles();
            this.isHeightFixed = this.dataSource.every(function (item) {
                return _this2.getAttr(item, 'height') != null;
            }) || !infinite;
            this.offsetY = this.isHeightFixed ? offsetY : this.offsetY;
        }

        /**
         * 调用initalize并触发change事件让组件更新,在componentWillReceiveProps中调用
         * @param dataSource
         * @param sortFunc
         * @param infinite
         * @param offsetY
         */

    }, {
        key: 'refresh',
        value: function refresh(_ref3) {
            var _ref3$dataSource = _ref3.dataSource,
                dataSource = _ref3$dataSource === undefined ? this.dataSource : _ref3$dataSource,
                _ref3$sort = _ref3.sort,
                sort = _ref3$sort === undefined ? this.sortFunc : _ref3$sort,
                _ref3$infinite = _ref3.infinite,
                infinite = _ref3$infinite === undefined ? this.infinite : _ref3$infinite,
                _ref3$staticSectionHe = _ref3.staticSectionHeight,
                staticSectionHeight = _ref3$staticSectionHe === undefined ? this.staticSectionHeight : _ref3$staticSectionHe,
                _ref3$offsetY = _ref3.offsetY,
                offsetY = _ref3$offsetY === undefined ? this.offsetY : _ref3$offsetY,
                _ref3$titleHeight = _ref3.titleHeight,
                titleHeight = _ref3$titleHeight === undefined ? this.titleHeight : _ref3$titleHeight,
                _ref3$titleOffset = _ref3.titleOffset,
                titleOffset = _ref3$titleOffset === undefined ? this.titleOffset : _ref3$titleOffset;

            this.initialize({ offsetY: offsetY, dataSource: dataSource, sort: sort, infinite: infinite, staticSectionHeight: staticSectionHeight, titleHeight: titleHeight, titleOffset: titleOffset });
            this.emitEvent('refresh', this.dataSource, this.groupTitles);
        }

        /**
         * 处理数据源,计算出数据源的所有title并插入
         * @param dataSource
         * @param itemHeight
         * @param titleHeight
         * @param sortFunc
         * @returns {Array}
         */

    }, {
        key: 'renderData',
        value: function renderData(dataSource) {
            var itemHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.itemHeight;

            var _this3 = this;

            var titleHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.titleHeight;
            var sortFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.sortFunc;

            if (!Array.isArray(dataSource)) {
                if (typeof dataSource.toArray === 'function') {
                    dataSource = dataSource.toArray();
                } else {
                    throw new Error('yo-grouplist: dataSource必须为数组或者Immutable List!');
                }
            }

            this.dataSource = this.insertGroupTitles(dataSource, this.extractGroupKeys(dataSource, sortFunc)).map(function (item) {
                var height = null;
                if (item._type === 'groupTitle') {
                    height = titleHeight;
                } else if (_this3.getAttr(item, 'height')) {
                    // 优先读取item中的height属性
                    height = _this3.getAttr(item, 'height');
                } else {
                    // 否则读取itemHeight属性
                    height = itemHeight;
                }
                return item._type === 'groupTitle' ? _this3.setAttr(item, 'height', height) : {
                    srcData: item,
                    height: height,
                    key: _this3.getAttr(item, 'key')
                };
            });
            return this.dataSource;
        }

        /**
         * 从数据源中提取出所有groupKey并根据sortFunc排序
         * @param dataSource
         * @param sortFunc
         * @returns {Array.<string>}
         */

    }, {
        key: 'extractGroupKeys',
        value: function extractGroupKeys(dataSource, sortFunc) {
            var _this4 = this;

            var keyListWithoutNotGrouped = dataSource.map(function (item) {
                return _this4.getAttr(item, 'groupKey');
            }).filter(function (key) {
                return key !== 'notGrouped';
            }).reduce(function (acc, groupKey) {
                if (acc.find(function (it) {
                    return it === groupKey;
                }) == null) {
                    acc.push(groupKey);
                }
                return acc;
            }, []);

            if (sortFunc) {
                keyListWithoutNotGrouped = keyListWithoutNotGrouped.sort(sortFunc);
            }

            this.groupKeys = ['notGrouped'].concat(keyListWithoutNotGrouped);
            return this.groupKeys;
        }

        /**
         * 将提取出的title与数据源merge,形成新的数据源
         * @param dataSource
         * @param groupKeys
         * @returns {Array}
         */

    }, {
        key: 'insertGroupTitles',
        value: function insertGroupTitles(dataSource, groupKeys) {
            var _this5 = this;

            return groupKeys.reduce(function (acc, key) {
                var title = {
                    _type: 'groupTitle',
                    groupKey: key,
                    key: 'group_title_' + key + (_this5.isTitleStatic ? '' : '_' + ++GroupCore.guid)
                };
                var ret = acc.concat(title, dataSource.filter(function (it) {
                    return _this5.getAttr(it, 'groupKey') === key;
                }));

                return key !== 'notGrouped' ? ret : ret.filter(function (item) {
                    return !(item._type === 'groupTitle' && _this5.getAttr(item, 'groupKey') === 'notGrouped');
                });
            }, []);
        }

        /**
         * 从数据源中获取所有title
         * @param dataSource
         * @returns {Array}
         */

    }, {
        key: 'getTitles',
        value: function getTitles() {
            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.filter(function (item) {
                return item._type === 'groupTitle';
            });
        }

        /**
         * 更新title的高度
         * 在无穷列表和静态列表模式中,titleHeight都是dom渲染之后才获取到的,这个高度会被用来计算stickyHeader的偏移量
         * @param item
         * @param domNode
         */

    }, {
        key: 'updateGroupTitle',
        value: function updateGroupTitle(item, domNode) {
            var _this6 = this;

            if (item._type === 'groupTitle') {
                if (!this.infinite) {
                    item = Object.assign({}, item, {
                        _translateY: domNode.offsetTop,
                        height: domNode.offsetHeight
                    });
                }
                item = Object.assign(item, {
                    display: getComputedStyle(domNode).getPropertyValue('display')
                });

                this.groupTitles = this.groupTitles.map(function (title) {
                    return _this6.getAttr(title, 'groupKey') === _this6.getAttr(item, 'groupKey') ? item : title;
                });
                return this.groupTitles;
            }
            return null;
        }

        /**
         * 根据当前列表的偏移量更新吸顶title的位置和内容
         * @param offsetY
         */

    }, {
        key: 'refreshStickyHeader',
        value: function refreshStickyHeader() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.offsetY;

            offsetY = offsetY - this.staticSectionHeight;
            var title = this.getCurrentTitle(offsetY),
                offset = this.getCurrentTitleOffsetY(offsetY),
                groupKey = title ? this.getAttr(title, 'groupKey') : null;

            if (this.currentGroup.offset !== offset || this.currentGroup.key !== groupKey) {
                this.currentGroup = { key: groupKey, offset: offset };
                this.stickyHeader = {
                    title: title,
                    offset: offset
                };

                this.emitEvent('refreshStickyHeader', this.stickyHeader);
            }
        }

        /**
         * 根据列表的偏移量计算吸顶title的偏移量
         * @param offsetY
         * @returns {number}
         */

    }, {
        key: 'getCurrentTitleOffsetY',
        value: function getCurrentTitleOffsetY(offsetY) {
            var nextTitle = this.getNextTitle(offsetY),
                currentTitle = this.getCurrentTitle(offsetY),
                nextTitleTranslateY = nextTitle && nextTitle._translateY;

            offsetY = offsetY + this.titleOffset;
            if (nextTitle && offsetY > nextTitleTranslateY - currentTitle.height && offsetY < nextTitleTranslateY) {
                return -(currentTitle.height - (nextTitleTranslateY - offsetY));
            }

            return 0;
        }

        /**
         * 根据列表偏移量获取当前吸顶的title的下一个title
         * @param offsetY
         * @param groupTitles
         * @returns {Object}
         */

    }, {
        key: 'getNextTitle',
        value: function getNextTitle(offsetY) {
            var groupTitles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.groupTitles;

            var currentTitle = this.getCurrentTitle(offsetY),
                currentTitleIndex = groupTitles.indexOf(currentTitle);

            if (currentTitleIndex !== -1 && currentTitleIndex !== groupTitles.length - 1) {
                return groupTitles[currentTitleIndex + 1];
            }

            return null;
        }

        /**
         * 根据偏移量获取当前被吸顶的title
         * @param offsetY
         * @param groupTitles
         * @returns {Object}
         */

    }, {
        key: 'getCurrentTitle',
        value: function getCurrentTitle(offsetY) {
            var _this7 = this;

            var groupTitles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.groupTitles;

            var titlesAboveOffsetY = groupTitles.filter(function (title) {
                return title._translateY != null && title._translateY <= offsetY + _this7.titleOffset;
            });
            return titlesAboveOffsetY[titlesAboveOffsetY.length - 1];
        }

        /**
         * 根据groupkey返回该分组title的translateY(用来做分组导航)
         * @param groupKey
         * @returns {Number}
         */

    }, {
        key: 'getGroupOffsetY',
        value: function getGroupOffsetY(groupKey) {
            var _this8 = this;

            var targetGroup = this.groupTitles.find(function (title) {
                return _this8.getAttr(title, 'groupKey') === groupKey;
            });

            if (targetGroup) {
                return targetGroup._translateY + this.staticSectionHeight;
            }

            return null;
        }
    }]);

    return GroupCore;
}(_ComponentCore3.default);

GroupCore.guid = -1;
exports.default = GroupCore;