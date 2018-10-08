"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 循环数组类,接收一个数组,生成一个无限循环的数据结构
 * 拥有和数组相似的API
 */

var LoopedArray = function () {
    function LoopedArray(dataSource) {
        _classCallCheck(this, LoopedArray);

        this.dataSource = dataSource;
    }

    /**
     * 获取循环数组中的第i项,通过模运算得到
     * @param index
     * @param dataSource
     * @returns {item}
     */


    _createClass(LoopedArray, [{
        key: "getItem",
        value: function getItem(index) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            return JSON.parse(JSON.stringify(dataSource[index % dataSource.length]));
        }

        /**
         * 循环数组slice,返回一个数组
         * @param start
         * @param end
         * @returns {Array}
         */

    }, {
        key: "slice",
        value: function slice(start, end) {
            var ret = [];
            for (var i = start; i < end; i++) {
                ret.push(this.getItem(i));
            }
            return ret;
        }

        /**
         * 循环数组map,返回一个新的循环数组
         * 将operation引用于原有的getItem生成新循环数组的getItem
         * @param operation
         * @returns {LoopedArray}
         */

    }, {
        key: "map",
        value: function map(operation) {
            var _this = this;

            var ret = new LoopedArray([]);
            ret.getItem = function (index) {
                return operation(_this.getItem(index), index);
            };
            return ret;
        }

        /**
         * 循环数组右折叠(无法进行左折叠)
         * @param rightIndex
         * @param operation
         * @param acc
         * @returns {acc}
         */

    }, {
        key: "reduceRight",
        value: function reduceRight(rightIndex, operation, acc) {
            var ret = null;
            if (rightIndex === 0) {
                ret = operation(this.getItem(0), acc);
            } else {
                ret = this.reduceRight(rightIndex - 1, operation, operation(this.getItem(rightIndex), acc));
            }
            return ret;
        }

        /**
         * 循环数组filter,返回一个数组
         * @param prediction
         * @returns {Array}
         */

    }, {
        key: "filter",
        value: function filter(prediction) {
            return new LoopedArray(this.dataSource.filter(prediction));
        }
    }]);

    return LoopedArray;
}();

exports.default = LoopedArray;