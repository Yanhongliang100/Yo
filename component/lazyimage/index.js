'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../common/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component LazyImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 懒加载图片组件，只能在 `Scroller` 和 `List` 中使用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用这个组件代替img标签后，会延迟加载这个图片，直到List组件的滚动使得该图片位于可视区域之内。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./lazyimage.md}{instruUrl: scroller/lazyimage.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version  3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TO_BE_LOADED = 0;
var LOADING = 1;
var LOADED = 2;

var _class = function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
        _classCallCheck(this, _class);

        // 0->等待load,1->loading,2->loaded
        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.loading = TO_BE_LOADED;
        _this.state = {
            src: _this.props.defaultImage
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refresh(this.context);
            var scroller = this.context.list || this.context.scroller;
            if (scroller) {
                scroller.childLazyImages.push(this);
            }
        }

        // 父组件render时,需要重置这个组件的loaded状态和context

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            this.refresh(nextContext);

            if (this.state.src !== nextProps.src) {
                this.loading = TO_BE_LOADED;
                this.setState({ src: this.props.defaultImage });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var scroller = this.context.list || this.context.scroller;
            if (scroller) {
                scroller.childLazyImages.splice(scroller.childLazyImages.indexOf(this), 1);
            }
            this.canLoadImage = false;
        }
    }, {
        key: 'refresh',
        value: function refresh(context) {
            this.canLoadImage = true;
            this.offsetY = context.offsetY;
            this.itemRef = context.itemRef;
            this.infinite = context.infinite;
            // 如果不是infinite的列表，那么应该获取offsetTop(这个开销还挺大的，不过没得优化了)，反之，则使用translateY
            if (!this.infinite) {
                this.offsetTop = (0, _util.getElementOffsetY)(this.img);
                this.height = this.img.offsetHeight;
            }
        }
    }, {
        key: 'load',
        value: function load(callback) {
            var _this2 = this;

            if (this.loading === TO_BE_LOADED) {
                var src = this.props.src,
                    tmpImg = new Image();

                this.loading = LOADING;
                tmpImg.onload = function () {
                    // 在lazyimage正在加载时组件unmount(主要是在SPA模式下有可能发生关闭view的情况)会报错
                    // 因此这里需要简单判断一下组件的实例是否还存在
                    if (_this2 && _this2.canLoadImage) {
                        _this2.loading = LOADED;
                        _this2.setState({ src: src, loaded: true });
                        if (callback) {
                            callback();
                        }
                    }
                };
                tmpImg.src = src;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                height = _props.height,
                style = _props.style,
                customAttr = _props.customAttr;
            // 解决和touchable组件结合使用的问题，必须能够接收这四个属性

            if (this.context.list) {
                if (height == null && style.height == null) {
                    throw Error('yo-lazyimage: 在List组件中使用LazyImage必须指定图片的高度。');
                }
            }

            return _react2.default.createElement('img', _extends({}, (0, _util.inheritProps)(this.props, ['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'width', 'height', 'className', 'title', 'style']), {
                alt: this.props.alt,
                ref: function ref(img) {
                    if (img) _this3.img = img;
                },
                src: this.state.src
            }, customAttr));
        }
    }]);

    return _class;
}(_react.Component);

_class.contextTypes = {
    // 从父组件context接收的属性
    // list/scroller组件实例的引用
    list: _react.PropTypes.object,
    scroller: _react.PropTypes.object,
    // listitem的offsetY(infinite模式下)
    offsetY: _react.PropTypes.number,
    // listitem实例的引用
    itemRef: _react.PropTypes.object,
    // 是否是Scroller下面的Lazyload,而不是List下面的
    isScroller: _react.PropTypes.bool,
    // 是否是infinite列表
    infinite: _react.PropTypes.bool
};
_class.propTypes = {
    /**
     * @property defaultImage
     * @type String
     * @default null
     * @description 默认图片，在原图片还没有完成加载时展示。
     */
    defaultImage: _react.PropTypes.string,
    /**
     * @property src
     * @type String
     * @default null
     * @description 图片src，必需。
     */
    src: _react.PropTypes.string.isRequired,
    /**
     * @property className
     * @type String
     * @default null
     * @description 给img标签加的类名。
     */
    className: _react.PropTypes.string,
    /**
     * @property width
     * @type Number
     * @default null
     * @description 图片宽度。
     */
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property height
     * @type Number
     * @default null
     * @description 图片高度。
     */
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property customAttr
     * @type Object
     * @default null
     * @description 附加给img dom节点的自定义属性，属性名需要以data-开头。
     */
    customAttr: _react.PropTypes.object,
    /**
     * @property style
     * @type Object
     * @default null
     * @description 附加给img dom节点的style。
     */
    style: _react.PropTypes.object,
    /**
     * @property alt
     * @type String
     * @default null
     * @description 和img标签的alt属性相同。
     */
    alt: _react.PropTypes.string,
    /**
     * @property title
     * @type String
     * @default null
     * @description 和img标签的title属性相同。
     */
    title: _react.PropTypes.string,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
};
_class.defaultProps = {
    defaultImage: null,
    src: null,
    className: null,
    width: null,
    height: null,
    customAttr: {},
    style: null
};
exports.default = _class;