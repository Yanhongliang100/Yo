'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNumBetween(min, max) {
    if (this < min) {
        return min;
    } else if (this > max) {
        return max;
    }
    return this;
}
// 30度的tan值
/**
 * infinateAni
 * @description
 * 该动画适用于图片查看器情景，即图片数两较多的情况下
 *
 */
var ALLOWANCE = 0.57;

exports.default = function () {
    var ALLOWANCEAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.57;
    var ALLOWANCEDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    return {
        handleData: function handleData(_ref, children) {
            var pageNow = _ref.pageNow;

            if (pageNow === 1) {
                // debugger
            }
            var newChildren = [];
            for (var i = pageNow - 2; i < pageNow + 1; i++) {
                // 当前页面为最后一页时children[pageNow]为空
                // 当为首页时children[pageNow-2]为空
                if (!children[i]) {
                    continue;
                }
                newChildren.push(_react2.default.cloneElement(children[i], {
                    style: {
                        WebkitTransform: 'translate(' + i * 100 + '%, -50%) translateZ(0)',
                        transform: 'translate(' + i * 100 + '%, -50%) translateZ(0)',
                        position: 'absolute',
                        left: 0,
                        top: '50%'
                    }
                    // currentPage:pageNow,
                }));
            }
            // 计算dom更新算法
            newChildren.sort(function (prev, next) {
                if (prev.key % 3 === 0) {
                    return true;
                }
                if (next.key % 3 === 0) {
                    return false;
                }
                return prev.key % 3 - next.key % 3;
            });
            // 用于撑起容器高度的当前元素
            newChildren.unshift(_react2.default.cloneElement(children[pageNow - 1], {
                key: 0,
                currentPage: pageNow,
                style: {
                    visibility: 'hidden'
                }
            }));
            return newChildren;
        },
        touchstart: function touchstart() {},

        // touchend(aniObj) {
        //     const {
        //         touchstartLocation,
        //         touchendLocation,
        //         pagesNum,
        //         pageNow,
        //         loop
        //     } = aniObj;
        //     let locatinoChange = touchstartLocation[0] - touchendLocation[0],
        //         change;
        //     change = locatinoChange > 0 ? pageNow + 1 : pageNow - 1;
        //     return this._checkAni(aniObj, change);
        // },
        touchmove: function touchmove(aniObj) {
            var touchmoveLocation = aniObj.touchmoveLocation,
                touchstartLocation = aniObj.touchstartLocation,
                stageDOM = aniObj.stageDOM,
                containerDOM = aniObj.containerDOM,
                speed = aniObj.speed,
                pageNow = aniObj.pageNow;

            var unit = stageDOM.clientWidth;
            var change = (touchstartLocation[0] - touchmoveLocation[0]) / unit + (pageNow - 1);
            var translateX = -change * 100;
            // console.log('move' + translateX);
            this._addCss({
                dom: containerDOM,
                speed: speed,
                translateX: translateX,
                reset: true
            });
        },
        touchcancel: function touchcancel() {},
        touchend: function touchend(aniObj) {
            var touchendLocation = aniObj.touchendLocation,
                touchstartLocation = aniObj.touchstartLocation,
                containerDOM = aniObj.containerDOM,
                speed = aniObj.speed,
                pageNow = aniObj.pageNow;

            var changeX = touchstartLocation[0] - touchendLocation[0];
            var changeY = touchendLocation[1] - touchstartLocation[1];
            var tan = Math.abs(changeX) / Math.abs(changeY);
            var change = void 0;
            if (tan < ALLOWANCE || Math.abs(changeX) < ALLOWANCEDistance) {
                change = pageNow - 1;
            } else {
                change = changeX > 0 ? pageNow : pageNow - 2;
                if (!aniObj.loop) {
                    var min = 0;
                    var max = aniObj.pagesNum - 1;
                    getNumBetween.call(this, min, max);
                    // if (change < min) {
                    //     change = min;
                    // } else if (change > max) {
                    //     change = max;
                    // }
                }
            }
            var translateX = -change * 100;
            this._addCss({
                dom: containerDOM,
                speed: speed,
                translateX: translateX
            });
            return this.checkAni(aniObj, change + 1);
        },
        checkAni: function checkAni(aniObj, num) {
            var isAni = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var loop = aniObj.loop,
                pagesNum = aniObj.pagesNum,
                containerDOM = aniObj.containerDOM,
                speed = aniObj.speed;

            if (!loop) {
                // num < 1 ? num = 1 : '';
                // num > pagesNum ? num = pagesNum : '';
                num = getNumBetween.call(num, 1, pagesNum);
            } else {
                num < 1 ? num = pagesNum : '';
                num > pagesNum ? num = 1 : '';
            }
            this._addCss({
                dom: containerDOM,
                reset: !isAni,
                translateX: -(num - 1) * 100,
                speed: speed
            });
            return num;
        },
        next: function next(aniObj) {
            return this.checkAni(aniObj, aniObj.pageNow + 1);
        },
        arrive: function arrive(aniObj, num, isAni) {
            return this.checkAni(aniObj, num, isAni);
        },
        prev: function prev(aniObj) {
            return this.checkAni(aniObj, aniObj.pageNow - 1);
        },
        _addCss: function _addCss(_ref2) {
            var dom = _ref2.dom,
                translateX = _ref2.translateX,
                reset = _ref2.reset;

            if (reset) {
                dom.style.webkitTransition = 'none';
                dom.style.transition = 'none';
            } else {
                dom.style.webkitTransition = '';
                dom.style.transition = '';
            }
            dom.style.webkitTransform = 'translate(' + translateX + '%, 0) translateZ(0)';
            dom.style.transform = 'translate(' + translateX + '%, 0) translateZ(0)';
        }
    };
};