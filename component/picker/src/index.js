'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PickerCore = require('./PickerCore');

var _PickerCore2 = _interopRequireDefault(_PickerCore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../../scroller/src');

var _src2 = _interopRequireDefault(_src);

var _PickerItem = require('./PickerItem');

var _PickerItem2 = _interopRequireDefault(_PickerItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Picker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Picker组件，行为和特性与iOS原生的picker完全一致。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持两种模式:静态模式和循环模式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 静态模式会完全按照传入的options渲染待选项，而循环模式会将options变成一个首尾循环的数据结构，可以无限地向上/向下滚动。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./picker.md}{instruUrl: picker.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SIZE = 1000000;
var ITEM_HEIGHT = 30;

var Picker = function (_Component) {
    _inherits(Picker, _Component);

    function Picker(props) {
        _classCallCheck(this, Picker);

        var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, props));

        var options = props.options,
            value = props.value,
            height = props.height,
            looped = props.looped;

        var size = looped ? SIZE : options.length;

        _this.pickerModel = new _PickerCore2.default({
            dataSource: options,
            value: value,
            loopedSize: size,
            containerHeight: height,
            itemHeight: ITEM_HEIGHT,
            looped: looped
        });
        // 因为槽的数量和组件的高度有关,因此也在state中维护
        _this.state = {
            thunks: _this.pickerModel.thunks,
            height: _this.pickerModel.containerHeight,
            contentHeight: _this.pickerModel.contentHeight,
            visibleList: _this.pickerModel.visibleList,
            offsetY: _this.pickerModel.offsetY
        };
        return _this;
    }

    _createClass(Picker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.pickerModel.registerEventHandler('change', function (visibleList) {
                _this2.setState({ visibleList: visibleList });
            }).registerEventHandler('momentumStart', function (newY) {
                _this2.refs.scroller.scrollTo(0, newY, 300);
            }).registerEventHandler('resetValue', function (newY, needRefresh) {
                _this2.setState({ offsetY: newY });

                if (needRefresh) {
                    _this2.refreshOffsetY(newY);
                }
            }).registerEventHandler('refresh', function (offsetY, visibleList, options, height, contentHeight, thunks) {
                _this2.setState({ offsetY: offsetY, visibleList: visibleList, options: options, height: height, contentHeight: contentHeight, thunks: thunks });
                _this2.refreshOffsetY(offsetY);
                // 等待update结束,refresh scroller
                setTimeout(function () {
                    _this2.refs.scroller.refresh({
                        scrollerHeight: contentHeight,
                        wrapperHeight: height
                    });
                }, 0);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.scroller.refresh({
                scrollerHeight: this.state.contentHeight,
                wrapperHeight: this.state.height
            });
        }

        /**
         * 如果仅仅是value发生了改变,其他属性都没有改变,只调用setValue
         * 这样可以跳过一些复杂的计算过程
         * @param nextProps
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value,
                options = nextProps.options,
                height = nextProps.height,
                looped = nextProps.looped;


            if (options === this.props.options && height === this.state.height && looped === this.props.looped) {
                if (this.props.value !== value) {
                    this.pickerModel.setValue(value, true);
                }
            } else {
                this.pickerModel.refresh({
                    dataSource: options,
                    value: value,
                    containerHeight: height,
                    looped: looped,
                    manually: true
                });
            }
        }

        /**
         * 滚动停止时,校正位置(需要正好卡到某个option处)并触发onChange
         * 然后验证外部组件是否重置了value,如果没有,回滚到之前的option
         * @param evt
         */

    }, {
        key: 'onScrollTerminate',
        value: function onScrollTerminate(evt) {
            var _this3 = this;

            // console.log('term')
            var currentY = evt.contentOffset.y,
                destination = this.pickerModel.getScrollDestination(currentY);

            // 滚动停止时再次校验是否滚到了正确的位置
            // 因为用户可能在惯性滑动时再次点击,终止惯性滚动,所以可能滑不到正确位置
            if (currentY !== destination.y) {
                this.pickerModel.onMomentumStart(currentY);
                return;
            }
            // 此处检验是否value真的发生了变化,这样可以减少很多onChange引起的render
            var lastStateY = this.state.offsetY,
                lastItem = this.pickerModel.getScrollDestination(lastStateY).item,
                selectedItem = destination.item;
            this.pickerModel.offsetY = currentY;
            if (selectedItem.value !== lastItem.value) {
                this.props.onChange(selectedItem);
            }
            // 在用户重设value之后验证value是否已经改变
            // 如果没有改变,回滚到上一个状态的offsety
            setTimeout(function () {
                if (_this3.state.offsetY === lastStateY) {
                    _this3.pickerModel.offsetY = lastStateY;
                    _this3.refreshOffsetY(lastStateY);
                }
            }, 0);
            // 重置isScrolling
            // 放在timeout里是为了让tap先触发
            // 200毫秒的延迟是为了防止使用者频繁点击导致错乱
            setTimeout(function () {
                _this3.isScrolling = false;
            }, 200);
        }

        /**
         * 根据当前的y重新计算visibleList
         * @param y
         */

    }, {
        key: 'refreshOffsetY',
        value: function refreshOffsetY(y) {
            this.refs.scroller.scrollTo(0, y);
            if (this.props.looped) {
                this.pickerModel.onScrollTo(y);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var itemHeight = ITEM_HEIGHT;
            var _props = this.props,
                extraClass = _props.extraClass,
                unit = _props.unit;

            var looped = this.pickerModel.looped;
            var _state = this.state,
                visibleList = _state.visibleList,
                offsetY = _state.offsetY,
                height = _state.height,
                contentHeight = _state.contentHeight,
                thunks = _state.thunks;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('yo-picker', extraClass), style: { height: height } },
                _react2.default.createElement('span', { className: 'mask' }),
                _react2.default.createElement(
                    _src2.default,
                    {
                        contentOffset: { x: 0, y: offsetY },
                        ref: 'scroller',
                        stopPropagation: this.props.stopPropagation,
                        wrapper: { clientWidth: 0, clientHeight: height },
                        useTransition: true,
                        onScroll: function onScroll(evt) {
                            if (looped) {
                                _this4.pickerModel.onScrollTo(evt.contentOffset.y);
                            }
                            _this4.isScrolling = true;
                        },
                        autoRefresh: false,
                        onScrollEnd: function onScrollEnd(evt) {
                            _this4.onScrollTerminate(evt);
                        }
                        // scrollCancel对应着两种情况:1.在滚动过程中tap中断滚动,2.静止时tap,只有第一种情况
                        // 才应该执行onScrollTerminate回调,在第二种情况会执行option的onOptionTap回调(直接滚动到目标option)
                        // 因此此处必须加上isScrolling的判断
                        , onScrollCancel: function onScrollCancel(evt) {
                            if (_this4.isScrolling) {
                                _this4.onScrollTerminate(evt);
                            }
                        },
                        onMomentumScrollBegin: function onMomentumScrollBegin(evt) {
                            return _this4.pickerModel.onMomentumStart(evt.param.targetY);
                        },
                        deceleration: 0.001,
                        bounceTime: looped ? 600 : 200
                    },
                    _react2.default.createElement(
                        'ul',
                        {
                            className: 'list',
                            style: {
                                height: contentHeight
                            }
                        },
                        looped ? thunks.map(function (_, order) {
                            var ele = visibleList.find(function (item) {
                                return item.order === order;
                            });
                            return ele ? _react2.default.createElement(_PickerItem2.default, {
                                onOptionTap: function onOptionTap(el) {
                                    if (!_this4.isScrolling) {
                                        _this4.refs.scroller.scrollTo(0, _this4.pickerModel.getPositionByOpt(el), 300);
                                    }
                                },
                                ele: ele,
                                itemHeight: itemHeight,
                                key: order,
                                order: order
                            }) : null;
                        }) : visibleList.map(function (item, i) {
                            return _react2.default.createElement(_PickerItem2.default, {
                                onOptionTap: function onOptionTap(ele) {
                                    if (!_this4.isScrolling) {
                                        _this4.refs.scroller.scrollTo(0, _this4.pickerModel.getPositionByOpt(ele), 300);
                                    }
                                },
                                ele: item,
                                itemHeight: itemHeight,
                                key: 'notLooped_' + i,
                                notLooped: true
                            });
                        })
                    )
                ),
                unit ? _react2.default.createElement(
                    'span',
                    { className: 'yo-select-item-tag unit' },
                    unit
                ) : null
            );
        }
    }]);

    return Picker;
}(_react.Component);

Picker.propTypes = {
    /**
     * @property options
     * @type Array
     * @default null
     * @description picker的options，数组形式，元素的格式为{text:string,value:string}。
     *
     * text为option显示的文本，value为option对应的真实值(参考网页option标签)。
     *
     * text的缺省值为value，value必须传入，且只能为字符串/数字类型。
     */
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired
    })).isRequired,
    /**
     * @property value
     * @type Number/String
     * @default null
     * @description 组件的value，参考网页select标签的value属性。
     *
     * value是一个严格受控属性，只能通过picker的父组件改变，你需要设置onChange属性来控制value属性的变化。
     */
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
    /**
     * @property onChange
     * @type Function
     * @default null
     * @param value 当前的option的value
     * @description 组件划动时触发的事件回调，如果不设置这个属性，这个picker的value将无法根据picker的滚动改变。
     *
     * onChange能够接收一个参数option，为当前选中的option的数据对象。
     *
     * 如果你不重新设置value，那么组件将会回滚到之前的值。
     *
     * onChange和value的使用和网页中select对应属性的使用完全一致。
     */
    onChange: _react.PropTypes.func,
    /**
     * @property height
     * @type Number
     * @default 150
     * @description picker的高度，默认150。
     *
     * Picker组件不能自适应容器的高度，必须为Picker组件显式地指定高度。
     */
    height: _react.PropTypes.number.isRequired,
    /**
     * @property looped
     * @type Bool
     * @default true
     * @description 是否采用循环模式，默认为true。
     */
    looped: _react.PropTypes.bool,
    /**
     * @property unit
     * @type Number
     * @default null
     * @description 显示在picker右侧的单位。
     */
    unit: _react.PropTypes.string,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 附加给组件根节点的额外class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property stopPropagation
     * @type Bool
     * @default false
     * @description 是否阻止默认事件传播，默认为false不阻止。
     */
    stopPropagation: _react.PropTypes.bool
};
Picker.defaultProps = {
    value: null,
    onChange: function onChange() {},
    height: 150,
    looped: true,
    unit: null,
    stopPropagation: false,
    extraClass: ''
};
exports.default = Picker;