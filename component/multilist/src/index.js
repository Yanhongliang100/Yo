'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _src = require('../../list/src');

var _src2 = _interopRequireDefault(_src);

var _multilistitem = require('./multilistitem.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component MultiList
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 多级选择列表组件，该组件基于list组件封装，支持列表展示，支持自定义模板展示，内容异步加载等功能。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./multilist/product.md}{instruUrl: multilist/transport.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./multilist/async.md}{instruUrl: multilist/async.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./multilist/personal.md}{instruUrl: multilist/product.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MultiList = function (_Component) {
    _inherits(MultiList, _Component);

    function MultiList(props) {
        _classCallCheck(this, MultiList);

        var _this = _possibleConstructorReturn(this, (MultiList.__proto__ || Object.getPrototypeOf(MultiList)).call(this, props));

        _this.state = {
            route: [],
            dataSource: _this._handleDataSource(Object.assign({}, _this.props.dataSource), []),
            valueItems: ''
        };
        _this.path = [];
        _this.newItems = [];
        return _this;
    }

    _createClass(MultiList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.calcPath();
            this.newItems = this._getItemsByValue(this.props.value);
            var lastItem = this._getItemsByRoute(this.pathIndex).pop();
            if (lastItem.subList === 'ASYNC') this.props.onUpdateData(lastItem);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.dataSource !== this.props.dataSource) {
                this.setState({
                    dataSource: this._handleDataSource(Object.assign({}, nextProps.dataSource), [])
                });
            }
            this.calcPath();
            this.newItems = this._getItemsByValue(nextProps.value);
            // 调用方保证 指定value时的 路径不存在 async
        }
        // shouldComponentUpdate(nextProps, nextState) {
        //     const shouldItemUpdate = nextProps.dataSource !== this.props.dataSource
        //     || this.state.route.join('-') !== nextState.route.join('-')
        //     || this.props.value !== nextProps.value;
        //     return shouldItemUpdate;
        // }

    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.prevValue = this.props.value.slice(0);
        }
    }, {
        key: 'calcPath',
        value: function calcPath() {
            this.path = [];
            this.pathIndex = [];
            this._recursionDataSourceForPath(this.props.dataSource, 0);
        }
    }, {
        key: '_handleDataSource',
        value: function _handleDataSource(dataSource, prev) {
            var _this2 = this;

            if (Array.isArray(dataSource.subList)) {
                dataSource.subList.forEach(function (item) {
                    var key = prev.concat(item.value);
                    if (!item.key) {
                        item.key = key.join('-');
                    }
                    if (item.subList) {
                        _this2._handleDataSource(item, key);
                    }
                });
            }
            return dataSource;
        }
    }, {
        key: '_recursionDataSourceForPath',
        value: function _recursionDataSourceForPath(data, level) {
            var _this3 = this;

            if (!Array.isArray(data.subList) || data.subList.length === 0) {
                return;
            }
            var len = this.props.value.length;
            var effectValue = void 0;
            if (new RegExp('^' + this.state.route.slice(0, len - 1).join('_')).test(this.props.value.slice(0, len - 1).join('_'))) {
                effectValue = this.props.value.slice(0)[level];
                effectValue = Array.isArray(effectValue) ? effectValue[0] : effectValue;
            }
            var value = this.state.route[level] || effectValue || data.defaultValue || data.subList[0].value;
            data.subList.some(function (item, index) {
                if (item.value === value) {
                    _this3.pathIndex[level] = index;
                    _this3.path[level] = value;
                    if (item.subList) {
                        _this3._recursionDataSourceForPath(item, level + 1);
                    }
                    return true;
                }
                return false;
            });
        }
    }, {
        key: '_handleItemChecked',
        value: function _handleItemChecked(_ref) {
            var item = _ref.item,
                level = _ref.level,
                data = _ref.data;

            if (this.path.slice(0, level).join('-') !== this.props.value.slice(0, level).join('-')) {
                if (!item.subList && item.value === data.defaultValue) {
                    return true;
                }
                return false;
            }
            if (Array.isArray(this.props.value[level])) {
                return !!~this.props.value[level].indexOf(item.value);
            }
            if (item.value === this.props.value[level]) return true;
            if (this.props.value[level] == null && !item.subList && item.value === data.defaultValue) {
                return true;
            }
            return false;
        }
    }, {
        key: '_handleItemRender',
        value: function _handleItemRender(data, level, item, i) {
            var isChecked = this._handleItemChecked({ item: item, level: level, data: data, index: i });
            var type = item.itemType || data.subItemType;
            var itemState = {
                level: level,
                index: this.path.slice(0, level).concat(item.value).join('-'),
                route: this.pathIndex.slice(0, level).concat(i).join('>'),
                isLeaf: !item.subList,
                isSpread: item.value === this.path[level] && !!item.subList,
                isChecked: isChecked,
                data: item
            };
            switch (type) {
                case 'MENU':
                    return _react2.default.createElement(_multilistitem.MenuItem, itemState);
                case 'RADIO':
                    return _react2.default.createElement(_multilistitem.RadioItem, itemState);
                case 'CHECKBOX':
                    return _react2.default.createElement(_multilistitem.CheckboxItem, itemState);
                default:
                    return this.props.renderItem(_extends({ itemType: type }, itemState));
            }
        }
    }, {
        key: '_handleShouldItemUpdate',
        value: function _handleShouldItemUpdate(level, isLastLevel, ret, nextItem, nowItem) {
            var isUpdate = false;
            if (isLastLevel) {
                return true;
            }
            if (nextItem.value !== nowItem.value) {
                isUpdate = true;
            }
            if (!isUpdate && this.prevValue[level] !== this.props.value[level] && (nowItem.value === this.prevValue[level] || nowItem.value === this.props.value[level])) {
                isUpdate = true;
            }
            // 路径的更改
            if (!isUpdate && this.prevPath[level] !== this.path[level]) {
                isUpdate = nowItem.value === this.prevPath[level] || nowItem.value === this.path[level];
            }
            return isUpdate;
        }
    }, {
        key: '_handleItemExtraClass',
        value: function _handleItemExtraClass(data, level, item) {
            return item.value === this.path[level] && item.subList ? 'spread' : '';
        }
    }, {
        key: '_handleItemTap',
        value: function _handleItemTap(data, level, item, index, target) {
            var type = item.itemType || data.subItemType;
            var upLevel = level;
            var newItems = this.newItems;
            var newValue = void 0;
            this.calcPath();
            this.setState({
                route: item.subList ? this.path.slice(0, level).concat(item.value) : this.path.slice(0, level)
            });
            switch (type) {
                case 'MENU':
                    {
                        var constDataSource = this.props.dataSource.subList;
                        var syncItem = this.pathIndex.some(function (i) {
                            if (constDataSource[i].subList === 'ASYNC') {
                                constDataSource = constDataSource[i];
                                return true;
                            }
                            constDataSource = constDataSource[i].subList;
                            return false;
                        });
                        if (syncItem) {
                            this.props.onUpdateData(constDataSource);
                        }
                        return;
                    }
                case 'RADIO':
                    newValue = this.path.slice(0, upLevel).concat(item.value);
                    newItems = this._getItemsByRoute(this.pathIndex.slice(0, upLevel)).concat(item);
                    break;
                case 'CHECKBOX':
                    if (this.path.slice(0, upLevel).join('-') === this.props.value.slice(0, upLevel).join('-')) {
                        newValue = this.props.value.slice(0);
                        var tmpValue = newValue[level];
                        if (Array.isArray(tmpValue) && tmpValue.length > 0) {
                            var valueIndex = tmpValue.indexOf(item.value);
                            if (valueIndex !== -1) {
                                tmpValue.splice(valueIndex, 1);
                                newItems[level].splice(valueIndex, 1);
                            } else {
                                tmpValue.push(item.value);
                                newItems[level].push(item);
                            }
                        } else {
                            tmpValue = [item.value];
                            newItems[level] = [item];
                        }
                        // handle final value
                        if (tmpValue.length > 0) {
                            newValue[level] = tmpValue;
                        } else {
                            newValue = [];
                            newItems = [];
                        }
                    } else {
                        newValue = this.path.slice(0, upLevel);
                        newValue.push([item.value]);
                        newItems = this._getItemsByRoute(this.pathIndex.slice(0, upLevel));
                        newItems.push([item]);
                    }
                    break;
                default:
                    newValue = this.props.onItemTap({ data: data, level: level, item: item, index: index, target: target });
            }
            // if (newValue[newValue.length - 1] == null) {
            // newValue = [];
            // }
            this.newItems = newItems;
            this.props.onChange({ newValue: newValue, oldValue: this.props.value, level: level, newItems: newItems });
        }
    }, {
        key: '_getItemsByRoute',
        value: function _getItemsByRoute(route, dataSource) {
            var _this4 = this;

            var constDataSource = dataSource || this.props.dataSource;
            return route.map(function (item) {
                if (Array.isArray(item)) {
                    return _this4._getItemsByRoute(item, constDataSource);
                } else {
                    constDataSource = constDataSource.subList[item];
                    return constDataSource;
                }
            });
        }
    }, {
        key: '_getItemsByValue',
        value: function _getItemsByValue(value) {
            var constDataSource = this.props.dataSource;
            return value.map(function (item) {
                var valueR = void 0;
                if (Array.isArray(item)) {
                    return constDataSource.subList.filter(function (i) {
                        return ~item.indexOf(i.value);
                    });
                }
                constDataSource.subList.some(function (i) {
                    if (item === i.value) {
                        valueR = i;
                        constDataSource = i;
                        return true;
                    }
                    return false;
                });
                return valueR;
            });
        }
    }, {
        key: '_recursionRender',
        value: function _recursionRender(data, level) {
            if (!data.subList) {
                return;
            }
            if (Array.isArray(data.subList) && data.subList.length > 0) {
                this.children.push(_react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                    _react2.default.createElement(_src2.default, {
                        dataSource: data.subList,
                        infinite: false,
                        extraClass: (0, _classnames2.default)(['yo-scroller-fullscreen', 'item', 'item-' + level]),
                        onItemTap: this._handleItemTap.bind(this, data, level),
                        renderItem: this._handleItemRender.bind(this, data, level),
                        itemExtraClass: this._handleItemExtraClass.bind(this, data, level),
                        shouldItemUpdate: this._handleShouldItemUpdate.bind(this, level, !data.subList[this.pathIndex[level]].subList)
                    })
                ));
                this._recursionRender(data.subList[this.pathIndex[level]], level + 1);
                return;
            }
            switch (data.subList) {
                case 'EMPTY':
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        _react2.default.createElement(_multilistitem.EmptyList, null)
                    ));
                    break;
                case 'FAULT':
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        _react2.default.createElement(_multilistitem.FaultList, null)
                    ));
                    break;
                case 'ASYNC':
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        _react2.default.createElement(_multilistitem.LoadingList, null)
                    ));
                    break;
                default:
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        this.props.renderContent({ type: data.subList, data: data, level: level })
                    ));
            }
        }
        /**
         * @skip
         * @description 渲染多级列表的调用函数
         * @return {Array} 列表的虚拟dom树
         */

    }, {
        key: 'renderList',
        value: function renderList() {
            this.children = [];
            this.prevPath = this.path.slice(0);
            this.calcPath();
            this._recursionRender(this.state.dataSource, 0);
            return this.children;
        }
    }, {
        key: 'render',
        value: function render() {
            var extraClass = this.props.extraClass;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(['yo-multilist'], extraClass) },
                this.renderList()
            );
        }
    }]);

    return MultiList;
}(_react.Component);

MultiList.propTypes = {
    /**
     * 原始数据用于生成列表
     * @property dataSource
     * @type Array
     * @description
     * dataSource 是一个树形的结构，每一个层级会有defaultValue，表示默认展开该哪个item或者默认选中项（非必填），subList为下级层级的内容，subList的每个字项设置内容如下。
     *
     * - name 为文字描述
     * - value 该项value
     * - subItemType 用于设置下一层级的list item使用的组件，内置 `MENU`,`RADIO`,`CHECKBOX`。如果传入的字符不在默认序列中会触发组件的renderItem方法，由用户自行渲染。
     * - itemType 用于定义当前item 使用的组件，优先级高于父层级的 `subItemType`。
     * - subList支持数组和String类型，当传入array类型渲染为列表，
     * 内置String为`FAULT`，`ASYNC`，`EMPTY`对应内置模板分别用于展示加载错误，加载中，加载内容为空三种情况，
     * 其中加载`ASYNC`会触发onUpdateData事件，通知用户更新数据。用户可以通过自定义字符串，触发renderContent方法，
     * 返回ReactElement作为内容并进行其他操作。
     * - defaultValue 表示该层级的默认值，若下一级为最后一层级表示，默认值[注意：默认值不会作为value]。
     *
     * @example
     * const dataSource = {
     *   defaultValue: 1,
     *   subItemType: 'MENU',
     *   subList: [{
     *       name: '同步',
     *      value: 1,
     *      defaultValue: '1-1',
     *      subItemType: 'RADIO',
     *      subList: [{
     *          name: '1-1  默认选项',
     *          value: '1-1'
     *      }, {
     *          name: '1-2',
     *          value: '1-2'
     *      }, {
     *          name: '1-3',
     *          value: '1-3'
     *      }, {
     *          name: '1-4',
     *          value: '1-4'
     *      }]
     *  }, {
     *      name: '异步',
     *      value: 2,
     *      subItemType: 'RADIO',
     *      defaultValue: '2-2',
     *      subList: 'ASYNC',
     *      asyncType: '2-2'
     *   }]
     *  };
     */
    dataSource: _react2.default.PropTypes.shape({
        subItemType: _react2.default.PropTypes.string.isRequired,
        onItemTapType: _react2.default.PropTypes.string,
        subList: _react2.default.PropTypes.array.isRequired,
        defaultValue: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.string, _react2.default.PropTypes.number])
    }).isRequired,
    /**
     * @property value
     * @type  Array
     * @description mutliList的值，该值为点选的value
     */
    value: _react2.default.PropTypes.array,
    /**
     * @property onChange
     * @type Function
     * @description
     * 用于更新结果的回调函数
     * @example
     *  function({level, listValue, newValue, newItems}){
     *  	level 表示当前菜单层级
     *  	oldValue 表示当前multiList的value
     *  	newValue 表示更新后的multiList的value
     *      newItems 表示更新后的value对应的item
     * 	}
     */
    onChange: _react.PropTypes.func.isRequired,
    /**
     * @property extraClass
     * @type String
     * @description 给组件根节点附加的额外样式类
     * @default null
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property onItemTap
     * @type Function
     * @description 当Item的类型不是'MENU'、'CHECKBOX'、'RADIO'，该事件将会被触发。事件处理函数需要有返回值，该值将会作为`newValue`触发组件的`onChange`事件。
     * @param {data, level, item, index, target} 父层数据，层级，改节点数据，该节点索引，
     */
    onItemTap: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.String]),
    /**
     * @property renderItem
     * @type Function
     * @description 当Item的类型不是'MENU'、'CHECKBOX'、'RADIO'，该事件将会被触发。事件处理函数需要有返回值，返回值是`PropsTypes.element`类型作为`List`的 `item`。
     * @param {itemType, data, level, item, index, target}  父层数据，节点所在层级，节点数据，该节点在父节点`subList`中的索引，
     * @example
     * renderItem={(item)=>{
     *      const {itemType, data, isSpread, index} = item;
     *      JSON.stringify(item);
     *      // {  "itemType":"ProductMenu", 节点的Type类型（此时的`itemType`是组件根据父节点`subItemType`和该节点`itemType`按照优先级处理过的值。）
     *      //    "level":0, item所在层级
     *      //    "index":"2", item所在父节点subList
     *      //    "route": "1>2>1", item在dataSource中的索引值
     *      //    "isLeaf":false, 该节点是否为叶子节点
     *      //    "isSpread":false, 如果该节点为父节点时该值表示该节点是否是展开的
     *      //    "isChecked":false, 该节点是否是有效值
     *      //    "data":{"name":"产品2","value":2,"subList":"product2","key":1,"_index":1} 原数据内容`key`值为组建计算由于优化List性能，如原数据中有设置则使用原数据，单请调用者保证key值在该层级中的唯一性。
     *      // }
     *      switch (itemType){
     *          case 'ProductMenu':
     *              return <ProductMenu data={data} isSpread={isSpread} index={index}/>
     *      }
     * }}
     */
    renderItem: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.String]),
    /**
     * @property renderContent
     * @type Function
     * @description 当subList的类型不是array，该事件将会被触发，事件处理函数需要有返回值，返回值是`PropsTypes.element`类型作为`List`的 `item`。
     * @param {itemType, data, level} 节点的Type类型， 父层数据，层级，改节点数据，该节点索引，
     * @example
     * renderContent={(item) => {
     *      const {type} = item;
     *      console.log(JSON.stringify(item));
     *      // {"type":"product1","data":{"name":"产品1","value":1,"subList":"product1","key":"1"},"level":1}
     *      switch (type){
     *          case 'product1':
     *              return <Product tit="product1" />;
     *          case 'product2':
     *              return <Product tit="product2" />;
     *      }
     *  }}
     */
    renderContent: _react.PropTypes.func,
    /**
     * @property onUpdateData
     * @type Function
     * @description 当加载的层级为`ASYNC`时触发，用于用户更新dataSource，用户通过获取数据中的内容判断如何更新dataSource。
     * @param data 父节点的数据
     */
    onUpdateData: _react.PropTypes.func
};
MultiList.defaultProps = {
    extraClass: '',
    value: []
};
exports.default = MultiList;