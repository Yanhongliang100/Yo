'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = function () {
    var me = {};
    var _elementStyle = document.createElement('div').style;

    var _vendor = function () {
        var vendors = ['t', 'WebkitT', 'MozT', 'msT', 'OT'];
        var transform = void 0;

        for (var i = 0, l = vendors.length; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    }();

    var _prefixStyle = function _prefixStyle(style) {
        if (_vendor === false) {
            return false;
        }
        if (_vendor === '') {
            return style;
        }
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    };

    me.getTime = Date.now || function getTime() {
        return new Date().getTime();
    };

    me.getRAF = function () {
        function basicRAF(callback) {
            return window.setTimeout(callback, 1000 / 60);
        }

        var rAF = window.cancelAnimationFrame && window.requestAnimationFrame || window.webkitCancelAnimationFrame && window.webkitRequestAnimationFrame || window.mozCancelAnimationFrame && window.mozRequestAnimationFrame || window.oCancelAnimationFrame && window.oRequestAnimationFrame || window.msCancelAnimationFrame && window.msRequestAnimationFrame || basicRAF;

        var cancelrAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;

        if (me.isBadAndroid) {
            rAF = basicRAF;
            cancelrAF = window.clearTimeout;
        }

        return { rAF: rAF, cancelrAF: cancelrAF };
    };

    me.extend = function (target, obj) {
        Object.keys(obj).forEach(function (i) {
            target[i] = obj[i];
        });
    };

    me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            destination = void 0,
            duration = void 0;
        var speed = Math.abs(distance) / time;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        };
    };

    var _transform = _prefixStyle('transform');

    me.extend(me, {
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: 'ontouchstart' in window,
        hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
    });

    /*
     This should find all Android browsers lower than build 535.19 (both stock browser and webview)
     - galaxy S2 is ok
     - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
     - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
     - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
     */
    me.isBadAndroid = function () {
        var appVersion = window.navigator.appVersion;
        var _isBadAndroid = false;
        // Android browser is not a chrome browser.
        if (/Android/.test(appVersion) && !/Chrome\/\d/.test(appVersion)) {
            var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
            if (safariVersion && (typeof safariVersion === 'undefined' ? 'undefined' : _typeof(safariVersion)) === 'object' && safariVersion.length >= 2) {
                _isBadAndroid = parseFloat(safariVersion[1]) < 535.19;
            } else {
                _isBadAndroid = true;
            }
        } else {
            _isBadAndroid = false;
        }

        return _isBadAndroid;
    }();

    me.extend(me.style = {}, {
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
    });

    me.offset = function (el) {
        var left = -el.offsetLeft,
            top = -el.offsetTop;

        // jshint -W084
        while (el = el.offsetParent) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
        }
        // jshint +W084

        return { left: left, top: top };
    };

    me.preventDefaultException = function (el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }

        return false;
    };

    me.extend(me.eventType = {}, {
        touchstart: 1,
        touchmove: 1,
        touchend: 1

        // mousedown: 2,
        // mousemove: 2,
        // mouseup: 2,
        //
        // pointerdown: 3,
        // pointermove: 3,
        // pointerup: 3,
        //
        // MSPointerDown: 3,
        // MSPointerMove: 3,
        // MSPointerUp: 3
    });

    me.extend(me.ease = {}, {
        quadratic: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function fn(k) {
                return k * (2 - k);
            }
        },
        circular: {
            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
            fn: function fn(k) {
                var _k = k - 1;
                return Math.sqrt(1 - _k * _k);
            }
        },
        back: {
            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fn: function fn(k) {
                var b = 4;
                var _k = k - 1;
                return _k * _k * ((b + 1) * _k + b) + 1;
            }
        },
        bounce: {
            style: '',
            fn: function fn(k) {
                var y = void 0,
                    _k = k;

                if (_k / 1 < 1 / 2.75) {
                    _k = _k / 1;
                    y = 7.5625 * _k * _k;
                } else if (k < 2 / 2.75) {
                    _k -= 1.5 / 2.75;
                    y = 7.5625 * _k * _k + 0.75;
                } else if (k < 2.5 / 2.75) {
                    _k -= 2.25 / 2.75;
                    y = 7.5625 * _k * _k + 0.9375;
                } else {
                    _k -= 2.625 / 2.75;
                    y = 7.5625 * _k * _k + 0.984375;
                }

                return y;
            }
        },
        elastic: {
            style: '',
            fn: function fn(k) {
                var f = 0.22,
                    e = 0.4;

                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }

                return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
            }
        }
    });

    return me;
}();

exports.default = utils;