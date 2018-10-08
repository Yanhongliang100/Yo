'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../common/util');

require('../../common/tapEventPluginInit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 评分组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Rating
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 评分组件，既可以用来评分，也可以用来展示评分。这是一个受控的组件，当用户点击评分之后，需要通过回调设置当前的分数，否则分数不会变化。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./rating.md}{instruUrl: rating.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    extraClass: '',
    total: 5,
    value: 0,
    readonly: false
};

var propTypes = {
    /**
     * 组件额外class
     *
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * 总分数
     *
     * @property total
     * @type Number
     * @description 图标的总数量。
     * @default 5
     */
    total: _react.PropTypes.number,
    /**
     * 当前分数
     *
     * @property value
     * @type Number
     * @description 当前点亮的图标数。
     * @default 0
     */
    value: _react.PropTypes.number,
    /**
     * 是否只读
     *
     * @property readonly
     * @type Bool
     * @description 是否只读。当为 `true` 的时候，只能展示评分，不能点击；当为 `false` 的时候，可以点击评分
     * @default false
     */
    readonly: _react.PropTypes.bool,
    /**
     * 点击评分的回调
     *
     * @property onChange
     * @type Function
     * @param {number} value 当前选择的图标数
     * @description (value) => void
     *
     * 点击评分的回调。由于 `Number` 是一个受控的组件，需要在该回调中设置 value 参数。
     */
    onChange: _react.PropTypes.func
};

var Rating = function (_Component) {
    _inherits(Rating, _Component);

    function Rating() {
        _classCallCheck(this, Rating);

        return _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).apply(this, arguments));
    }

    _createClass(Rating, [{
        key: 'getItemStyle',
        value: function getItemStyle(index) {
            var _width = (this.props.value - index) * 100;
            var _fixedWidth = parseInt(Math.max(Math.min(_width, 100), 0), 10);

            return {
                width: _fixedWidth.toString() + '%'
            };
        }
    }, {
        key: 'handleTap',
        value: function handleTap(index) {
            if (this.props.readonly) {
                return;
            }

            if (this.props.onChange) {
                this.props.onChange(index + 1);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                extraClass = _props.extraClass,
                total = _props.total;

            var ratingClass = ['yo-rating', extraClass].join(' ');

            return _react2.default.createElement(
                'ul',
                { className: ratingClass },
                (0, _util.getArrayByLength)(total).fill('').map(function (item, index) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'item', key: index, onTouchTap: function onTouchTap() {
                                return _this2.handleTap(index);
                            } },
                        _react2.default.createElement('span', { style: _this2.getItemStyle(index) })
                    );
                })
            );
        }
    }]);

    return Rating;
}(_react.Component);

exports.default = Rating;


Rating.propTypes = propTypes;
Rating.defaultProps = defaultProps;