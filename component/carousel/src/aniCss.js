'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var ALLOWANCE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    return {
        handleData: function handleData(aniObj, children) {
            return children;
        },
        touchstart: function touchstart() {},
        touchend: function touchend(aniObj) {
            var touchstartLocation = aniObj.touchstartLocation,
                touchendLocation = aniObj.touchendLocation,
                pageNow = aniObj.pageNow;

            var locatinoChange = touchstartLocation[0] - touchendLocation[0];
            var change = locatinoChange > 0 ? pageNow + 1 : pageNow - 1;
            return this._checkAni(aniObj, change);
        },
        touchmove: function touchmove() {},
        touchcancel: function touchcancel() {},
        _checkAni: function _checkAni(aniObj, num) {
            var loop = aniObj.loop,
                pagesNum = aniObj.pagesNum;

            if (!loop) {
                num < 1 ? num = 1 : '';
                num > pagesNum ? num = pagesNum : '';
            } else {
                num < 1 ? num = pagesNum : '';
                num > pagesNum ? num = 1 : '';
            }
            return num;
        },
        next: function next(aniObj) {
            return this._checkAni(aniObj, aniObj.pageNow + 1);
        },
        arrive: function arrive(aniObj, num) {
            return num;
        },
        prev: function prev(aniObj) {
            return this._checkAni(aniObj, aniObj.pageNow - 1);
        }
    };
};