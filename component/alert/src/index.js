'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @component Alert
                                                                                                                                                                                                                                                                               * @version 3.0.0
                                                                                                                                                                                                                                                                               * @description 警告提示组件，居中展现需要关注的信息，基于Confirm组件实现。
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * - 类似浏览器原生API调用方式。
                                                                                                                                                                                                                                                                               * - 自定义组件显隐过程动画。
                                                                                                                                                                                                                                                                               * - 返回一个Promise实例对象，可通过then方法绑定确定按钮回调。
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               *  @author qingguo.xu
                                                                                                                                                                                                                                                                               * @instructions {instruInfo: ./alert.md}{instruUrl: alert.html?hideIcon}
                                                                                                                                                                                                                                                                               */

exports.default = Alert;

var _src = require('../../confirm/src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method Alert
 * @description Alert API，调用以后在屏幕正中弹出一个Alert，可以按照option对象参数调用，也可以使用简易
 * 调用方式如 ``Alert(content, title, btnText, animation)``
 * @param {Object} option 配置对象，里面可以接受如下属性：
 * @param {String} [option.content] 组件显示的内容
 * @param {String} [option.title] 组件显示的标题
 * @param {String} [option.btnText] <3.0.1> 组件按钮的文本
 * @param {String | Object} [option.animation] 组件显隐执行的动画，格式同Dialog组件
 * @constructor Alert API
 */
function Alert() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var btnText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['确定', ''];
  var animation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'fade';

  if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object') {
    var opt = content;
    content = opt.content != null ? opt.content : '';
    title = opt.title != null ? opt.title : '';
    btnText = opt.btnText != null ? [opt.btnText, ''] : ['确定', ''];
    animation = opt.animation || 'fade';
  }
  return (0, _src2.default)(content, title, btnText, animation, false);
}