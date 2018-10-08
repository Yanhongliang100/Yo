'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../../common/tapEventPluginInit');

var _src = require('../../list/src');

var _src2 = _interopRequireDefault(_src);

var _src3 = require('../../touchable/src');

var _src4 = _interopRequireDefault(_src3);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Suggest
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 输入提示组件, 根据用户的输入给出待选项并展示在输入框下方。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Suggest的内容分为两个区域, 推荐区域(recommendTmpl)会在用户输入开始前渲染, 可以用来给出一些热门推荐。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 结果区域(resultTmpl)用来响应用户的输入, 根据用户的输入给出输入提示。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./suggest/suggest.md}{instruUrl: suggest/city_select_example.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./suggest/useWithPopup.md}{instruUrl: suggest/use_with_popup.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    /**
     * @property results
     * @type Array
     * @default null
     * @description 渲染在结果区的数据源,数组类型,数组元素的类型可以是字符串/数字，它们会直接作为列表项的内容；
     *
     * 也可以是对象,这个对象必须有text属性。
     */
    results: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.shape({
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    })])),
    /**
     * @property onConditionChange
     * @type Function
     * @param {String} value 输入框当前的value
     * @default null
     * @description 输入框onChange事件回调,必需。
     *
     * 为了使组件正常工作,你必须定义这个属性,根据每次的value来更新results。
     */
    onConditionChange: _react.PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 附加给组件根节点的额外类名。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property itemTouchClass
     * @type String
     * @default item-light
     * @description 点击结果区域列表项时添加的className。
     */
    itemTouchClass: _react.PropTypes.string,
    /**
     * @property noDataTmpl
     * @type Element
     * @default null
     * @description 没有suggest结果时的模板。
     * noDataTpl
     */
    noDataTmpl: _react.PropTypes.element,
    /**
     * @property recommendTmpl
     * @type Element
     * @default null
     * @description 推荐区域内容,在搜索条件为空时展示。
     */
    recommendTmpl: _react.PropTypes.element,
    /**
     * @property onItemTap
     * @type Function
     * @default () =>{}
     * @param {Object} item 数据源中的元素
     * @param {Number} index item在数据源中的index
     * @description 点击结果项时的回调。
     */
    onItemTap: _react.PropTypes.func,
    /**
     * @property renderItem
     * @type Function
     * @default Suggest.renderItem
     * @param {Object} item 结果项的数据对象,格式为{value,text}
     * @description 自定义结果项的渲染方式,返回JSX或字符串。
     */
    renderItem: _react.PropTypes.func,
    /**
     * @property renderResult
     * @type Function
     * @default null
     * @param results 结果列表
     * @description 自定义结果容器的渲染方式,返回JSX。
     *
     * 组件默认以List的形式渲染结果区域,如果不希望以List的形式展示结果,可以传入这个函数。组件会使用这个函数返回的JSX渲染结果区域。
     */
    renderResult: _react.PropTypes.func,
    /**
     * @property infinite
     * @type Bool
     * @default false
     * @version 3.0.4
     * @description 是否在结果区域的列表开启Infinite模式。注意：开启Infinite模式后，你需要为列表项配置key属性。
     */
    infinite: _react.PropTypes.bool,
    /**
     * @property itemHeight
     * @type Number
     * @default 44
     * @version 3.0.4
     * @description 结果区域列表项的高度，只在Infinite模式下生效。
     */
    itemHeight: _react.PropTypes.number,
    /**
     * @property infiniteSize
     * @type Number
     * @default 20
     * @version 3.0.4
     * @description 无穷列表模式下,保留在列表容器中列表项的个数(参见List组件无穷列表模式的说明)。
     */
    infiniteSize: _react.PropTypes.number,
    /**
     * @property showCancelButton
     * @type Bool
     * @default false
     * @description 是否显示取消按钮,默认不显示。
     */
    showCancelButton: _react.PropTypes.bool,
    /**
     * @property cancelButtonText
     * @type String
     * @default 取消
     * @description 取消按钮文本。
     */
    cancelButtonText: _react.PropTypes.string,
    /**
     * @property onCancelButtonClick
     * @type Function
     * @default () =>{}
     * @description 点击取消按钮时的回调。
     */
    onCancelButtonTap: _react.PropTypes.func,
    /**
     * @property onSubmit
     * @type Function
     * @default ()=>{}
     * @param condition 当前输入框的value
     * @description 点击键盘确定按钮时触发的回调。
     */
    onSubmit: _react.PropTypes.func,
    /**
     * @property onFocus
     * @type Function
     * @default () =>{}
     * @param condition 当前输入框的value
     * @description 输入框聚焦时的回调。
     */
    onFocus: _react.PropTypes.func,
    /**
     * @property onBlur
     * @type Function
     * @default () =>{}
     * @param condition 当前输入框的value
     * @description 输入框失去焦点时的回调。
     */
    onBlur: _react.PropTypes.func,
    /**
     * @property defaultCondition
     * @type String
     * @default null
     * @description 展示在输入框中的默认值。
     */
    defaultCondition: _react.PropTypes.string,
    /**
     * @property placeholder
     * @type String
     * @default null
     * @description 输入框的placeholder。
     */
    placeholder: _react.PropTypes.string,
    /**
     * @property inputIcon
     * @type String
     * @default 'delete'
     * @description 展示在输入框右侧的icon,有四个icon可供选择:delete,loading,refresh和stop。
     *
     * delete图标点击以后会清除输入框的内容,其余的三个图标可以通过传入onIconTap属性来定制点击它们的回调。
     */
    inputIcon: _react.PropTypes.oneOf(['delete', 'loading', 'refresh', 'stop']),
    /**
     * @property onIconTap
     * @type Function
     * @default () =>{}
     * @param iconName 图标名称
     * @param condition 当前输入框的value
     * @description 点击input icon触发的回调。
     */
    onIconTap: _react.PropTypes.func,
    /**
     * @property throttleGap
     * @type Number
     * @default 300
     * @description 设置此属性以后,文本框的onChange事件的触发频率会降低,例如设置为300会使得onChange每300毫秒触发一次.
     *
     * 通过这种方式,可以控制组件结果区域的render次数,降低和服务器交互的频率。
     */
    throttleGap: _react.PropTypes.number,
    /**
     * @property showMask
     * @type Bool
     * @description 在弹起键盘时，是否显示遮罩层。
     */
    showMask: _react.PropTypes.bool
};

var Suggest = function (_Component) {
    _inherits(Suggest, _Component);

    _createClass(Suggest, null, [{
        key: 'getResultText',
        value: function getResultText(result) {
            var ret = null;
            if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
                ret = result.text;
            } else if (typeof result === 'string' || typeof result === 'number') {
                ret = result;
            }
            return ret;
        }
    }, {
        key: 'renderItem',
        value: function renderItem(result) {
            return Suggest.getResultText(result);
        }
    }]);

    function Suggest(props) {
        _classCallCheck(this, Suggest);

        var _this = _possibleConstructorReturn(this, (Suggest.__proto__ || Object.getPrototypeOf(Suggest)).call(this, props));

        _this.prev = null;
        _this.state = { condition: props.defaultCondition, showRecommendMask: false };
        _this.wrapConditionChangeHandler();
        return _this;
    }

    _createClass(Suggest, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.defaultCondition !== this.props.defaultCondition) {
                this.setState({ condition: nextProps.defaultCondition });
            }
        }
    }, {
        key: 'onConditionChange',
        value: function onConditionChange(value) {
            this.onConditionChangeHandler(value);
            this.setState({ condition: value });
            if (this.resultList) {
                this.resultList.stopAnimate();
                this.resultList.scrollTo(0, 0);
            }
        }
    }, {
        key: 'getIconClass',
        value: function getIconClass(iconName, animation) {
            var _props = this.props,
                showCancelButton = _props.showCancelButton,
                inputIcon = _props.inputIcon;

            var iconClass = ['yo-ico', 'yo-ico-' + iconName, showCancelButton ? 'show-cancel' : ''].join(' ').replace(/\s$/, '');

            var show = null;
            if (!inputIcon) {
                show = '';
            } else if (inputIcon === iconName) {
                show = 'show';
                if (iconName === 'delete' && this.state.condition === '') {
                    show = '';
                }
            } else {
                show = '';
            }

            return [iconClass, show, animation].join(' ').replace(/\s$/, '');
        }

        /**
         * @method clearInput
         * @description 清空输入框的内容
         */

    }, {
        key: 'clearInput',
        value: function clearInput() {
            this.onConditionChange('');
        }
    }, {
        key: 'wrapConditionChangeHandler',
        value: function wrapConditionChangeHandler() {
            var _this2 = this;

            var gap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.throttleGap;

            if (gap) {
                this.onConditionChangeHandler = (0, _throttle2.default)(function (value) {
                    if (value !== _this2.prev) {
                        _this2.prev = value;
                        _this2.props.onConditionChange(value);
                    }
                }, gap);
            } else {
                this.onConditionChangeHandler = function (value) {
                    if (value !== _this2.state.condition) {
                        _this2.props.onConditionChange(value);
                    }
                };
            }
        }
    }, {
        key: 'renderResult',
        value: function renderResult(results) {
            var _this3 = this;

            var _props2 = this.props,
                renderItem = _props2.renderItem,
                onItemTap = _props2.onItemTap,
                noDataTmpl = _props2.noDataTmpl,
                itemTouchClass = _props2.itemTouchClass,
                infinite = _props2.infinite,
                infiniteSize = _props2.infiniteSize,
                itemHeight = _props2.itemHeight;


            var ret = null;
            if (this.state.condition) {
                if (results.length) {
                    ret = _react2.default.createElement(_src2.default, {
                        extraClass: 'yo-scroller-fullscreen',
                        ref: function ref(component) {
                            if (component) {
                                _this3.resultList = component;
                            }
                        },
                        dataSource: results,
                        renderItem: renderItem,
                        infinite: infinite,
                        infiniteSize: infiniteSize,
                        itemHeight: itemHeight,
                        onItemTap: onItemTap,
                        itemTouchClass: itemTouchClass
                    });
                } else {
                    ret = noDataTmpl;
                }
            }
            return ret;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var condition = this.state.condition;
            var _props3 = this.props,
                results = _props3.results,
                extraClass = _props3.extraClass,
                renderResult = _props3.renderResult,
                showCancelButton = _props3.showCancelButton,
                onIconTap = _props3.onIconTap,
                onCancelButtonTap = _props3.onCancelButtonTap,
                placeholder = _props3.placeholder;

            var rootClass = ['yo-suggest', extraClass, showCancelButton ? 'yo-suggest-modal' : ''].join(' ').trim();
            var realRenderResult = renderResult || this.renderResult.bind(this);
            var deleteIconClass = this.getIconClass('delete');
            var loadingIconClass = this.getIconClass('loading');
            var refreshIconClass = this.getIconClass('refresh');
            var stopIconClass = this.getIconClass('stop');
            var resultContent = realRenderResult(results);

            return _react2.default.createElement(
                'div',
                { className: rootClass },
                _react2.default.createElement(
                    'div',
                    { className: 'operate' },
                    _react2.default.createElement(
                        'form',
                        {
                            className: 'action'
                            // 没有action ios上键盘右下按钮文本就不是搜索
                            , action: '',
                            onSubmit: function onSubmit(evt) {
                                _this4.props.onSubmit(_this4.state.condition, evt);
                                evt.preventDefault();
                                return false;
                            }
                        },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-suggest' },
                            '\uF067'
                        ),
                        _react2.default.createElement('input', {
                            autoComplete: 'off',
                            ref: function ref(dom) {
                                _this4.input = dom;
                            },
                            value: condition,
                            onChange: function onChange(evt) {
                                _this4.onConditionChange(evt.target.value);
                            },
                            onFocus: function onFocus(evt) {
                                _this4.props.onFocus(evt.target.value);
                                _this4.setState({ showRecommendMask: true });
                            },
                            onBlur: function onBlur(evt) {
                                _this4.props.onBlur(evt.target.value);
                                _this4.setState({ showRecommendMask: false });
                            },
                            type: 'search',
                            className: 'input',
                            id: 'yo-suggest-input',
                            placeholder: placeholder
                        }),
                        _react2.default.createElement(
                            'i',
                            {
                                className: deleteIconClass,
                                onTouchTap: function onTouchTap(evt) {
                                    evt.preventDefault();
                                    _this4.clearInput();
                                    _this4.input.focus();
                                }
                            },
                            '\uF077'
                        ),
                        _react2.default.createElement(
                            'i',
                            { className: loadingIconClass },
                            '\uF089'
                        ),
                        _react2.default.createElement(
                            'i',
                            { className: refreshIconClass, onTouchTap: function onTouchTap() {
                                    return onIconTap('refresh', condition);
                                } },
                            '\uF07A'
                        ),
                        _react2.default.createElement(
                            'i',
                            { className: stopIconClass, onTouchTap: function onTouchTap() {
                                    return onIconTap('stop', condition);
                                } },
                            '\uF063'
                        )
                    ),
                    _react2.default.createElement(
                        _src4.default,
                        {
                            touchClass: 'cancel-btn-touch',
                            onTap: function onTap() {
                                onCancelButtonTap();
                            }
                        },
                        _react2.default.createElement(
                            'span',
                            { className: 'cancel' },
                            this.props.cancelButtonText
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'cont' },
                    _react2.default.createElement('div', {
                        onTouchTap: function onTouchTap() {
                            return _this4.input.blur();
                        },
                        className: (0, _classnames2.default)('mask', this.props.showMask && this.state.showRecommendMask ? 'show' : '')
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'recommend' },
                        this.props.recommendTmpl
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('result', resultContent ? 'show' : '') },
                        resultContent
                    )
                )
            );
        }
    }]);

    return Suggest;
}(_react.Component);

exports.default = Suggest;


Suggest.defaultProps = {
    results: [],
    onConditionChange: function onConditionChange() {},
    extraClass: '',
    itemTouchClass: 'item-touch',
    noDataTmpl: null,
    onItemTap: function onItemTap() {},
    renderItem: Suggest.renderItem,
    renderResult: null,
    showCancelButton: false,
    showLoadingIcon: false,
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},

    onIconTap: function onIconTap() {},
    onSubmit: function onSubmit() {},

    defaultCondition: '',
    placeholder: '搜索',
    inputIcon: 'delete',
    onCancelButtonTap: function onCancelButtonTap() {},

    recommendTmpl: null,
    throttleGap: null,
    cancelButtonText: '取消',
    showMask: false,
    infinite: false,
    infiniteSize: 20,
    itemHeight: 44
};

Suggest.propTypes = propTypes;