'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../../common/tapEventPluginInit');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Carousel.CarouselItem
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Carousel组件内部的Item组件，和普通的dom节点相比增加了懒加载图片功能。也可以使用`onTap`给Item绑定tap事件回调。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 你可以通过Carousel.CarouselItem来使用这个组件，或者引用`yo3/component/carousel/src/carouselItem`的js模块来使用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ** 注意：`CarouselItem`不能和`Touchable`一起使用，请使用它的`onTap`属性来绑定事件回调。 **
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ALLOWANCE = 1;
var LOADED = 1;
var UNLOAD = 0;
var FAIL = 2;

var CarouselItem = function (_Component) {
    _inherits(CarouselItem, _Component);

    function CarouselItem(props) {
        _classCallCheck(this, CarouselItem);

        var _this = _possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

        if (props.img) {
            _this.state = {
                img: 0
            };
        }
        _this.handleTap = _this.handleTap.bind(_this);
        _this.hasUnmount = false;
        return _this;
    }

    _createClass(CarouselItem, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.lazyload(this.props);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            var propsChange = (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
            var contextChange = this.context.currentPage !== nextContext.currentPage || this.context.pagesNum !== nextContext.pagesNum;
            return propsChange || contextChange;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
            this.lazyload(nextContext.currentPage);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.hasUnmount = true;
        }
    }, {
        key: 'handleTap',
        value: function handleTap(e) {
            this.props.onTap(e);
        }
    }, {
        key: 'loadImg',
        value: function loadImg() {
            var _this2 = this;

            if (!this.props.img) {
                return;
            }
            this.imgNode = new Image();
            this.imgNode.onload = function () {
                var imgState = void 0;
                imgState = 1;
                if (_this2.props.checkImgFun && !_this2.props.checkImgFun(_this2.imgNode)) {
                    imgState = 2;
                }
                if (!_this2.hasUnmount) {
                    _this2.setState({
                        img: imgState
                    });
                }
            };
            this.imgNode.onerror = function () {
                if (!_this2.hasUnmount) {
                    _this2.setState({
                        img: 2
                    });
                }
            };
            this.imgNode.src = this.props.img;
        }
    }, {
        key: 'lazyload',
        value: function lazyload(currentPage) {
            if (this.state.img) {
                return;
            }
            if (!this.props.lazyload) {
                this.loadImg();
            } else {
                if (Math.abs(currentPage - this.props.index) <= ALLOWANCE || this.props.index === 1 || this.props.index === this.context.pagesNum) {
                    this.loadImg();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var img = null;
            var classList = void 0;
            var activeClass = {};
            if (this.props.img) {
                switch (this.state.img) {
                    case LOADED:
                        img = _react2.default.createElement('img', { alt: '', src: this.props.img, className: 'img', draggable: 'false' });
                        break;
                    case FAIL:
                        img = _react2.default.createElement('img', { alt: '', src: this.props.errorImg, className: 'img', draggable: 'false' });
                        break;
                    case UNLOAD:
                    default:
                        img = this.props.loadingEle;
                        break;
                }
            }
            activeClass[this.props.activeClass] = this.context.currentPage === this.props.index;
            if (this.props.extraClass) {
                activeClass[this.props.extraClass] = true;
            }
            classList = (0, _classnames2.default)('item', activeClass);
            return _react2.default.createElement(
                'li',
                { className: classList, style: this.props.style, onTouchTap: this.handleTap },
                img
            );
        }
    }]);

    return CarouselItem;
}(_react.Component);

CarouselItem.propTypes = {
    /**
     * @type String
     * @property img
     * @description 图片地址。
     */
    img: _react.PropTypes.string,
    /**
     * @type String
     * @property errorImg
     * @description 图片加载失败时的替换图片。
     */
    errorImg: _react.PropTypes.string,
    /**
     * @type Function
     * @property checkImgFun
     * @description 目标图片onload时触发进行判断的函数。
     * @param 图片实例
     */
    checkImgFun: _react.PropTypes.func,
    /**
     * @type Function
     * @property onTap
     * @param {e} 事件对象，传入组件数据
     * @description item点击事件处理函数。
     */
    onTap: _react.PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @type Element
     * @property loadingEle
     * @description 图片加载时的loading Element。
     */
    loadingEle: _react.PropTypes.element,
    /**
     * @type Bool
     * @property lazyload
     * @description 是否需要图片懒加载。默认值为true,当前图片的前后两个节点图片被加载。
     */
    lazyload: _react.PropTypes.bool,
    /**
     * item是当前展示item的样式名
     * @type String
     * @property activeClass
     * @description item是当前展示item的样式名，默认值为'on'。
     */
    activeClass: _react.PropTypes.string,
    index: _react.PropTypes.number,
    style: _react.PropTypes.object
};
CarouselItem.defaultProps = {
    errorImg: '//s.qunarzz.com/mobile_search_touch/intention-search-h5/loading.gif',
    loadingEle: null,
    lazyload: true,
    activeClass: 'on',
    onTap: function onTap() {}
};
CarouselItem.contextTypes = {
    currentPage: _react2.default.PropTypes.number.isRequired,
    pagesNum: _react2.default.PropTypes.number.isRequired
};
exports.default = CarouselItem;