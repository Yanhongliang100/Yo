"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by qingguo.xu on 16/9/13.
 */
/**
 * getClient 获取touch事件的相对坐标 [x, y]
 * @param evt {Event} Touch事件对象
 * @param arr {Array} 相对坐标值, TouchStart时的坐标, 默认为[0, 0]
 * @return {Array} 相对坐标 [x, y]
 */
var getClient = function getClient(evt) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
    return !!evt.touches[0] ? [evt.touches[0].clientX - arr[0], evt.touches[0].clientY - arr[1]] : [evt.changedTouches[0].clientX - arr[0], evt.changedTouches[0].clientY - arr[1]];
};

/**
 * setTransform 设置node元素的translate属性
 * @param node {Object} DOM节点
 * @param isPercent {Boolean} 是否转换成百分比
 * @param distanceX {Number} translateX值
 * @param distanceY {Number} translateY值
 */
var setTransform = exports.setTransform = function setTransform(_ref) {
    var node = _ref.node,
        _ref$isPercent = _ref.isPercent,
        isPercent = _ref$isPercent === undefined ? false : _ref$isPercent,
        _ref$distanceX = _ref.distanceX,
        distanceX = _ref$distanceX === undefined ? 0 : _ref$distanceX,
        _ref$distanceY = _ref.distanceY,
        distanceY = _ref$distanceY === undefined ? 0 : _ref$distanceY;

    if (isPercent) {
        distanceX = distanceX * 100;
        distanceY = distanceY * 100;
        node.style.WebkitTransform = "translate(" + distanceX + "%, " + distanceY + "%) translateZ(0)";
        node.style.transform = "translate(" + distanceX + "%, " + distanceY + "%) translateZ(0)";
        return;
    }
    if (node) {
        node.style.WebkitTransform = "translate(" + distanceX + "px, " + distanceY + "px) translateZ(0)";
        node.style.transform = "translate(" + distanceX + "px, " + distanceY + "px) translateZ(0)";
    }
};

var _class = function () {
    /**
     * Drag 构造函数
     * @param node {DOM} 拖动的DOM节点
     * @param aniClass {String} transition动画, start时去掉, end时加上
     * @param isPercent {Boolean} 是否转换成百分比
     * @param isVertical {Boolean} 是否竖向拖动
     */
    function _class(_ref2) {
        var node = _ref2.node,
            _ref2$aniClass = _ref2.aniClass,
            aniClass = _ref2$aniClass === undefined ? '' : _ref2$aniClass,
            _ref2$isPercent = _ref2.isPercent,
            isPercent = _ref2$isPercent === undefined ? false : _ref2$isPercent,
            _ref2$isVertical = _ref2.isVertical,
            isVertical = _ref2$isVertical === undefined ? false : _ref2$isVertical;

        _classCallCheck(this, _class);

        this.start = [];
        this.move = 0;
        this.targetNode = node;
        this.aniClass = aniClass;
        this.isPercent = isPercent;
        this.isVertical = isVertical;
        this.draging = false; // 是否拖动
        this.hasDir = false; // 确定拖动距离是否满足方向
        this.isFirst = true; // 是否第一次运算
    }

    /**
     * getMove 获取当前的拖动距离
     * @returns {*|number}
     */


    _createClass(_class, [{
        key: "getMove",
        value: function getMove() {
            return this.move;
        }

        /**
         * setMove 重置当前的拖动距离
         * @param move {Number}
         */

    }, {
        key: "setMove",
        value: function setMove(move) {
            this.move = move;
        }

        /**
         * refreshDrag 刷新Drag, 回到原点
         */

    }, {
        key: "refreshDrag",
        value: function refreshDrag() {
            this.move = 0;
            setTransform({ node: this.targetNode, isPercent: this.isPercent });
        }

        /**
         * ensureDir 根据第一个TouchMove来判断拖动的距离是否满足拖动方向
         * @param evt {Object} 拖动事件对象
         */

    }, {
        key: "ensureDir",
        value: function ensureDir(evt) {
            var _getClient = getClient(evt, this.start),
                _getClient2 = _slicedToArray(_getClient, 2),
                moveX = _getClient2[0],
                moveY = _getClient2[1];

            moveX = Math.abs(moveX);
            moveY = Math.abs(moveY);
            if (this.isVertical) {
                if (moveX > 5) {
                    this.isFirst = false;
                    return;
                }
                if (moveY > 2 * moveX) {
                    this.hasDir = true;
                    return;
                }
            }
            if (moveY > 5) {
                this.isFirst = false;
                return;
            }
            if (moveX > 2 * moveY) {
                this.hasDir = true;
                return;
            }
            return;
        }

        /**
         * dragStart 拖动开始函数处理
         * @param evt {Object} touchStart事件对象
         */

    }, {
        key: "dragStart",
        value: function dragStart(evt) {
            evt.preventDefault();
            this.draging = true;
            this.start = getClient(evt);
            this.targetNode.className = this.targetNode.className.replace(this.aniClass, '');
        }

        /**
         * dragMove 拖动过程事件处理
         * @param evt {Object} touchMove事件对象
         * @param middleWare {Function} 对拖动距离的进一步处理
         */

    }, {
        key: "dragMove",
        value: function dragMove(evt, middleWare) {
            evt.preventDefault();
            if (!this.draging) {
                return;
            }
            if (!this.hasDir) {
                if (this.isFirst) this.ensureDir(evt);
                return;
            }
            this.move = this.isVertical ? getClient(evt, this.start)[1] : getClient(evt, this.start)[0];
            if (!!middleWare) {
                this.move = middleWare(this.move);
            }
            this.isVertical ? setTransform({ node: this.targetNode, isPercent: this.isPercent, distanceY: this.move }) : setTransform({ node: this.targetNode, isPercent: this.isPercent, distanceX: this.move });
        }

        /**
         * dragEnd 拖动结束时的事件处理
         * @param evt {Object} touchEnd事件处理
         * @param middleWare {Function}
         * @returns {*|number|Number}
         */

    }, {
        key: "dragEnd",
        value: function dragEnd(evt, middleWare) {
            evt.preventDefault();
            this.isFirst = true;
            if (!this.draging || !this.hasDir) {
                return;
            }
            this.draging = false;
            this.hasDir = false;
            this.move = this.isVertical ? getClient(evt, this.start)[1] : getClient(evt, this.start)[0];
            if (this.targetNode.className.search(this.aniClass) == -1) {
                this.targetNode.className += this.aniClass;
            }
            if (!!middleWare) {
                this.move = middleWare(this.move);
                this.isVertical ? setTransform({ node: this.targetNode, isPercent: this.isPercent, distanceY: this.move }) : setTransform({ node: this.targetNode, isPercent: this.isPercent, distanceX: this.move });
                return this.move;
            }
        }
    }, {
        key: "dragCancel",
        value: function dragCancel(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            this.draging = false;
            this.hasDir = false;
            this.isFirst = true;
        }
    }]);

    return _class;
}();

exports.default = _class;