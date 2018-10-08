'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../common/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateTimeCore = function () {
    function DateTimeCore(value, range) {
        var units = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var dateOrTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'date';
        var extraNumStrWrapper = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (val) {
            return val;
        };

        _classCallCheck(this, DateTimeCore);

        this.monthMapDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.monthRange = { min: 1, max: 12 };
        this.minsRange = { min: 0, max: 59 };
        this.refresh(value, range, dateOrTime, units, extraNumStrWrapper);
        this.deepUpdateMultiPickerState();
    }

    _createClass(DateTimeCore, [{
        key: 'refresh',
        value: function refresh() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;
            var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.range;
            var dateOrTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dateOrTime;
            var units = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.units;
            var extraNumStrWrapper = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.extraNumStrWrapper.bind(this);

            this.value = value;
            this.range = range;
            this.dateOrTime = dateOrTime;
            this.levels = (0, _util.getArrayByLength)(value.length).fill(1).map(function (cur, index) {
                return index;
            });
            this.units = units;
            this.extraNumStrWrapper = extraNumStrWrapper;
            this.rangeStore = this.calculateRange(this.range, this.dateOrTime);
            this.value = this.trimValue(this.value);
            this.currRange = this.getCurrRange();
            return this;
        }
    }, {
        key: 'deepUpdateMultiPickerState',
        value: function deepUpdateMultiPickerState() {
            var _this = this;

            this.multiPickerState = this.levels.reduce(function (accState, level) {
                accState[level] = _this.genPickerState(level, _this.currRange[level], _this.value[level]);
                return accState;
            }, {});
        }

        // 只有value及currRange 发生变化时，只需从已有的状态中取出需要更新的new options即可。

    }, {
        key: 'shallowUpdateMultiPickerState',
        value: function shallowUpdateMultiPickerState(level, currRange, value) {
            this.multiPickerState[level] = this.genPickerState(level, currRange, value);
        }
    }, {
        key: 'updateDateTime',
        value: function updateDateTime(newValues) {
            var _this2 = this;

            var levels = this.levels;
            var startLevel = void 0;

            newValues.forEach(function (newValue, level) {
                var pickerState = _this2.multiPickerState[level];
                if (newValue !== pickerState.value && pickerState.value !== undefined) {
                    _this2.value[level] = newValue;
                    if (startLevel === undefined) {
                        startLevel = level;
                    }
                }
            });
            levels.forEach(function (level) {
                var pickerState = _this2.multiPickerState[level];
                if (level < startLevel || pickerState.value === undefined) {
                    return;
                }
                var currRange = _this2.getCurrRange(),
                    _currRange$level = currRange[level],
                    min = _currRange$level.min,
                    max = _currRange$level.max,
                    currValue = _this2.value[level],
                    newValue = _this2.cutNum(currValue, min, max),
                    options = _this2.multiPickerState[level].options,
                    minValue = options[0].value,
                    maxValue = options[options.length - 1].value;


                _this2.value[level] = newValue || _this2.value[level];
                if (min !== minValue || max !== maxValue) {
                    _this2.shallowUpdateMultiPickerState(level, currRange[level], newValue);
                } else {
                    _this2.multiPickerState[level].value = _this2.value[level];
                }
            });
        }
    }, {
        key: 'genPickerState',
        value: function genPickerState(level, currRange, value) {
            var units = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.units;
            var min = currRange.min,
                max = currRange.max;

            return {
                options: this.mapRangeToOptions(min, max, level, units[level] || ''),
                value: value
            };
        }
    }, {
        key: 'mapRangeToOptions',
        value: function mapRangeToOptions(min, max, level, unit) {
            var _this3 = this;

            return (0, _util.getArrayByLength)(max - min + 1).fill(1).map(function (cur, index) {
                return {
                    value: index + min,
                    text: _this3.extraNumStrWrapper(index + min, level) + unit
                };
            });
        }

        /**
         * 获取合法的 新 value
         * @method getNextValue
         * @param {Number} changedValue 当前改变的 value
         * @param {Number} changedLevel 当前改变的 value 所在的 level（年、月、日 or 时、分，0 1 2）
         * @return {Array} 合法的新 value 数组。
         *
         * @description 输入当前改变的 value，及所在的 level，返回合法的 包含全部 level 的 value 的数据。
         */

    }, {
        key: 'getNextValue',
        value: function getNextValue(changedValue, changedLevel) {
            var nextValue = [].concat(this.value);
            nextValue[changedLevel] = changedValue;

            return this.trimValue(nextValue);
        }
    }, {
        key: 'trimValue',
        value: function trimValue(unLegalValue) {
            var _this4 = this;

            return this.levels.reduce(function (legalValue, level) {
                // 获取 当前 level 的 range 范围
                var nextRange = _this4.getCurrRange(legalValue),
                    _nextRange$level = nextRange[level],
                    min = _nextRange$level.min,
                    max = _nextRange$level.max,
                    value = legalValue[level],
                    trimedValue = _this4.cutNum(value, min, max);

                // 将裁减过的合法 value 存入 legalValue 数组中，方便在下次循环中，
                // 以此 value，算出下一级 新的 range，进而可通过裁减调整 得到下一级的 value
                legalValue[level] = trimedValue;
                return legalValue;
            }, unLegalValue);
        }

        /* range: [[2000,7, 23], [2016, 9, 3]],
            rangeStore: {
                2000: {
                    min: 7,
                    max: 12,
                    7: {min: 23, max: 31},
                2016: {
                    min: 1,
                    max: 9,
                    9: {min: 1, max: 3},
                }
            }
        */

    }, {
        key: 'calculateRange',
        value: function calculateRange() {
            var _this5 = this;

            var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.range;

            var min = this.selectByMode(1, 0);
            return range.reduce(function (rangeStore, cur, index) {
                var high = cur[0],
                    mid = cur[1],
                    low = cur[2] || 0,
                    days = _this5.getDaysByMonth(mid);

                if (index === 0) {
                    rangeStore[high] = { min: mid, max: _this5.selectByMode(12, 59) };
                    rangeStore[high][mid] = { min: low, max: _this5.selectByMode(days, 59) };
                } else {
                    rangeStore[high] = Object.assign({ min: min }, rangeStore[high], { max: mid });
                    rangeStore[high][mid] = Object.assign({ min: min }, rangeStore[high][mid], { max: low });
                }
                return rangeStore;
            }, {});
        }
    }, {
        key: 'getCurrRange',
        value: function getCurrRange() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;
            var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dateOrTime;
            var rangeStore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.rangeStore;

            var midRange = rangeStore[value[0]],
                lowRange = midRange && midRange[value[1]],
                highRange = { min: this.range[0][0], max: this.range[1][0] },
                monthRange = this.monthRange,
                minsRange = this.minsRange,
                dayRange = { min: 1, max: this.getDaysByMonth(value[1]) },
                range = {
                0: highRange,
                1: midRange || this.selectByMode(monthRange, minsRange),
                2: lowRange || this.selectByMode(dayRange, minsRange)
            };
            return range;
        }
    }, {
        key: 'selectByMode',
        value: function selectByMode(dateRange, timeRange) {
            var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dateOrTime;

            return mode === 'date' ? dateRange : timeRange;
        }
    }, {
        key: 'cutNum',
        value: function cutNum(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
    }, {
        key: 'isLeapYear',
        value: function isLeapYear(num) {
            var mod4 = num % 4,
                mod100 = num % 100,
                mod400 = num % 400;
            return !mod4 && (mod100 || !mod100 && !mod400);
        }
    }, {
        key: 'getDaysByMonth',
        value: function getDaysByMonth(month) {
            var year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value[0];
            var isLeap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.isLeapYear.bind(this);
            var monthMapDays = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.monthMapDays;

            var leap = isLeap(year);
            return !(leap && month === 2) ? monthMapDays[month - 1] : monthMapDays[month - 1] + 1;
        }
    }]);

    return DateTimeCore;
}();

exports.default = DateTimeCore;