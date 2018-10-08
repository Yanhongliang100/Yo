'use strict';

var _fastclick = require('./fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/7/8.
 */
if (!window.___yoTapEventInjected) {
    // 不要觉得这里没用
    // 因为yo-router也用了tap-event-plugin，如果不加try catch会报引用两次tap-event-plugin的警告
    try {
        (0, _reactTapEventPlugin2.default)();
    } catch (e) {}

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        _fastclick2.default.attach(document.body);
    }

    document.addEventListener('DOMContentLoaded', function () {
        _fastclick2.default.attach(document.body);
    });
    document.body.addEventListener('touchmove', function (evt) {
        evt.preventDefault();
    });
    window.___yoTapEventInjected = true;
}