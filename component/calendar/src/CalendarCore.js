'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComponentCore2 = require('../../common/ComponentCore');

var _ComponentCore3 = _interopRequireDefault(_ComponentCore2);

var _lunar = require('./lunar.js');

var _lunar2 = _interopRequireDefault(_lunar);

var _holiday = require('./holiday.js');

var _holiday2 = _interopRequireDefault(_holiday);

var _util = require('../../common/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * getEndDate 获取间隔天数的最后一天日期
 * @param date {Date} 起始日期对象
 * @param offset {Number} 间隔天数
 * @returns {Date} 结束日期对象
 */
var getEndDate = function getEndDate(date, offset) {
    var startTime = date.getTime();
    var endTime = startTime + offset * 24 * 3600 * 1000;
    return new Date(endTime);
};

/**
 * getFirstDayOfMonth 获取某年某月第一天
 * @param year {String} 年份
 * @param month {String} 月份
 * @returns {Date}
 */
var getFirstDayOfMonth = function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
};

/**
 * getLastDayOfMonth 获取某年某月最后一天
 * @param year {String}
 * @param month {String}
 * @returns {Date}
 */
var getLastDayOfMonth = function getLastDayOfMonth(year, month) {
    return new Date(year, month, 0);
};

/**
 * isWeekend 确定某天是否周末
 * @param dayNum {Number} 日期号
 * @param firstDay {Number} 当月第一天的星期数
 * @return {Boolean}
 */
var isWeekend = function isWeekend(dayNum, firstDay) {
    var num = (+dayNum + firstDay) % 7;
    // 0是周六、1是周日
    return num === 0 || num === 1;
};

/**
 * format 格式化日期 eg: 2016-08-09
 * @param date {Date}
 * @returns {string}
 */
var format = function format(date) {
    return [date.getFullYear(), (0, _lunar.convert2digit)(date.getMonth() + 1), (0, _lunar.convert2digit)(date.getDate())].join('-');
};

/**
 * onlyFormatMonth 仅格式化月，eg: 2016-08-9
 * @param date {Date}
 */
var onlyFormatMonth = function onlyFormatMonth(date) {
    return [date.getFullYear(), (0, _lunar.convert2digit)(date.getMonth() + 1), date.getDate()].join('-');
};

/**
 * formatMonth 格式化某年某月月为指定格式， eg： 2016/08
 * @param year {String}
 * @param month {String}
 * @returns {string}
 */
var formatMonth = function formatMonth(year, month) {
    return [year, (0, _lunar.convert2digit)(month)].join('/');
};

/**
 * getHoliday 根据传入的参数，对应到holiday.js，返回节假日信息
 * @param str1 {string} 月-日 eg: '09-08'
 * @param str2 {string} solar | lunar
 * @returns {string} 节假日信息
 */
var getHoliday = function getHoliday(str1) {
    var str2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'solar';
    return _holiday2.default[str2][str1] || '';
};

/**
 * formatMonthChinese 中文格式： 2016年8月
 * @param year {String}
 * @param month {String}
 * @returns {string}
 */
var formatMonthChinese = function formatMonthChinese(year, month) {
    return year + '\u5E74' + month + '\u6708';
};

/**
 * compareDate 对比两个日期的大小
 * @param date1 {Date}
 * @param date2 {Date}
 * @return {Number} [相差的天数]
 */
var compareDate = function compareDate(date1, date2) {
    return date1.getTime() - date2.getTime();
};

/**
 * getDateInfoArr 获取年、月、日、星期等信息
 * @param date {Date}
 * @returns {Array}
 */
var getDateInfoArr = function getDateInfoArr(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDay(), date.getDate()];
};

/**
 * isHoliday 判断是否是假期
 * @param year {number}
 * @param month {number}
 * @param day {number}
 * @returns {string} 节假日信息或者''
 */
var isHoliday = function isHoliday(year, month, day) {
    var res = '';
    var tempMonth = (0, _lunar.convert2digit)(month);
    var tempDay = (0, _lunar.convert2digit)(day);
    var lunar = (0, _lunar2.default)(year, tempMonth, tempDay);
    res += getHoliday(tempMonth + '-' + tempDay);
    res += ' '; // 防止两个节日相连
    if (!!lunar.Term) {
        // 清明节，不固定
        res += lunar.Term + ' ';
    }
    res += getHoliday(lunar.str, 'lunar');
    return res.trim();
};

/**
 * 继承ComponentCore组件，主要基于观察者模式，注册、触发自定义事件
 */

var CalendarCore = function (_ComponentCore) {
    _inherits(CalendarCore, _ComponentCore);

    function CalendarCore() {
        _classCallCheck(this, CalendarCore);

        var _this = _possibleConstructorReturn(this, (CalendarCore.__proto__ || Object.getPrototypeOf(CalendarCore)).call(this, 'canlendar'));

        _this.checkIn = null;
        _this.checkInDate = null;
        _this.checkOut = null;
        _this.checkOutDate = null;
        _this.checkRange = []; // 缓存入、住店中间范围ITem对象的引用
        _this.hasToday = false; // today 检测
        _this.beforeToday = true; // beginDate是否在today之前
        _this.isRender = false;
        _this.allowSingle = false; // 是否尽允许选择单日情况
        return _this;
    }

    /**
     * handleChange 点击日期时触发的函数
     * @param str {String} 点中的日期字符串 '2016-10-01'
     * @returns {null}
     */


    _createClass(CalendarCore, [{
        key: 'handleChange',
        value: function handleChange(str) {
            var resObj = {
                selectionStart: '',
                selectionEnd: ''
            };
            var resStr = str.replace(/\//g, '-');
            if (!!this.checkOut || !this.checkIn || this.allowSingle) {
                resObj.selectionStart = resStr;
                return this.emitEvent('check', resObj);
            }
            if (!!this.checkIn) {
                // 处理IOS不兼容2016-10-01， 但不改变原有日期格式
                var tempStr = str.replace(/-/g, '/');
                if (compareDate(new Date(tempStr), this.checkInDate) < 0) {
                    resObj.selectionStart = resStr;
                } else {
                    resObj.selectionStart = onlyFormatMonth(this.checkInDate);
                    resObj.selectionEnd = resStr;
                }
                return this.emitEvent('check', resObj);
            }
            return this.emitEvent('check', resObj);
        }

        /**
         * isToday 某年某月某天是否是今天， this.hasToday存储结果
         * @param year {String}
         * @param month {String}
         * @param day {String}
         * @returns {Boolean}
         */

    }, {
        key: 'isToday',
        value: function isToday(year, month, day) {
            var tempDate = new Date();
            this.hasToday = tempDate.getFullYear() === parseFloat(year) && tempDate.getMonth() + 1 === parseFloat(month) && tempDate.getDate() === parseFloat(day);
            return this.hasToday;
        }

        /**
         * getDate 获取满足需要的groupList格式数据
         * @param duration {Number | Array} 时间间隔或起始时间日期
         * @param selectionStart {String} 入店时间， eg: 2016-10-01
         * @param selectionEnd {String} 离店时间， eg: 2016-10-01
         * @param allowSingle {Boolean} 允许单选
         * @returns {Array}
         */

    }, {
        key: 'getData',
        value: function getData(_ref) {
            var duration = _ref.duration,
                selectionStart = _ref.selectionStart,
                selectionEnd = _ref.selectionEnd,
                allowSingle = _ref.allowSingle;

            var beginDate = '';
            var endDate = '';
            var todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            this.allowSingle = allowSingle;
            if ((typeof duration === 'undefined' ? 'undefined' : _typeof(duration)) === 'object') {
                beginDate = new Date(duration[0].replace(/-/g, '/'));
                endDate = new Date(duration[1].replace(/-/g, '/'));
            } else {
                beginDate = todayDate;
                endDate = getEndDate(beginDate, duration);
            }

            this.checkIn = selectionStart.replace(/-/g, '/');
            this.checkOut = selectionEnd.replace(/-/g, '/');
            this.checkInDate = new Date(this.checkIn);
            this.checkOutDate = new Date(this.checkOut);
            this.hasToday = false;
            this.beforeToday = compareDate(beginDate, todayDate);
            // 入店日期为今天之前的情况， 则重置为今天
            if (compareDate(this.checkInDate, todayDate) < 0) {
                this.checkInDate = todayDate;
            }

            // 两次选中同一天情况，相当于allowSingle
            if (!this.allowSingle && this.checkIn === this.checkOut) {
                this.allowSingle = true;
            }

            // 入店日期在离店日期之后， 则互换两者
            if (!!selectionEnd && compareDate(this.checkInDate, this.checkOutDate) > 0) {
                var _ref2 = [this.checkOutDate, this.checkInDate];
                this.checkInDate = _ref2[0];
                this.checkOutDate = _ref2[1];
            }

            return this.getCheckArr({ beginDate: beginDate, endDate: endDate });
        }

        /**
         * getCheckArr， 根据开始日期获取满足条件的dataSource
         * @param beginDate {Date} 开始日期对象
         * @param endDate {Date} 结束日期对象
         * @returns {Array}
         */

    }, {
        key: 'getCheckArr',
        value: function getCheckArr(_ref3) {
            var _this2 = this;

            var beginDate = _ref3.beginDate,
                endDate = _ref3.endDate;

            var _getDateInfoArr = getDateInfoArr(beginDate),
                _getDateInfoArr2 = _slicedToArray(_getDateInfoArr, 2),
                beginYear = _getDateInfoArr2[0],
                beginMonth = _getDateInfoArr2[1];

            var _getDateInfoArr3 = getDateInfoArr(endDate),
                _getDateInfoArr4 = _slicedToArray(_getDateInfoArr3, 4),
                endYear = _getDateInfoArr4[0],
                endMonth = _getDateInfoArr4[1],
                endDay = _getDateInfoArr4[2],
                endDayNum = _getDateInfoArr4[3];

            var endMonthLastDate = getLastDayOfMonth(endYear, endMonth).getDate();
            var tempYear = beginYear;
            var tempMonth = beginMonth;
            var resArr = [];
            // 当月第一天的星期数
            var dayFirst = getFirstDayOfMonth(beginYear, beginMonth - 1).getDay();
            // baseIndex 基数值，用于补足日期显示范围最后一周的剩下几天
            // addNormalDateFlag 避免超过当前月的最大值，如32
            // disable 同上，最后一周补上额外的几天不可点击
            var addMapFn = function addMapFn(item, i, _ref4) {
                var _ref4$baseIndex = _ref4.baseIndex,
                    baseIndex = _ref4$baseIndex === undefined ? 0 : _ref4$baseIndex,
                    _ref4$addNormalDateFl = _ref4.addNormalDateFlag,
                    addNormalDateFlag = _ref4$addNormalDateFl === undefined ? true : _ref4$addNormalDateFl,
                    _ref4$disable = _ref4.disable,
                    disable = _ref4$disable === undefined ? false : _ref4$disable;

                var day = baseIndex + i + 1;
                if (addNormalDateFlag || day <= endMonthLastDate) {
                    return {
                        day: day,
                        date: formatMonth(tempYear, tempMonth),
                        lunar: (0, _lunar2.default)(tempYear, tempMonth, day).str,
                        today: _this2.hasToday ? false : _this2.isToday(tempYear, tempMonth, day),
                        isCheckIn: false,
                        isCheck: false,
                        isCheckOut: false,
                        weekend: isWeekend(day, dayFirst),
                        holiday: isHoliday(tempYear, tempMonth, day),
                        disabled: disable || _this2.beforeToday <= 0 && !_this2.hasToday
                    };
                }
                return { disabled: true };
            };
            while (tempYear < endYear || tempYear === endYear && tempMonth <= endMonth) {
                var isEnd = tempYear === endYear && tempMonth === endMonth;
                var tempDateObj = getLastDayOfMonth(tempYear, tempMonth);
                var dayLast = isEnd ? endDay : tempDateObj.getDay();
                var dayLength = isEnd ? endDayNum : tempDateObj.getDate();

                // 某月第一天之前的空格数
                var firstMonthArr = (0, _util.getArrayByLength)(dayFirst).fill({ disabled: true });

                // 某月最后一天之后的空格数
                var lastMonthArr = (0, _util.getArrayByLength)(6 - dayLast).fill({ disabled: true });

                // 某月具体每个天数的信息对象
                var tempMonthArr = (0, _util.getArrayByLength)(dayLength).fill(0).map(addMapFn);

                // 补足显示日期范围最后一周的剩下几天情况, 为了美观
                if (isEnd) {
                    var lastWeekArr = (0, _util.getArrayByLength)(6 - endDay).fill(0).map(function (item, i) {
                        return addMapFn(item, i, {
                            baseIndex: endDayNum,
                            addNormalDateFlag: false,
                            disable: true
                        });
                    });
                    tempMonthArr = tempMonthArr.concat(lastWeekArr);
                }
                var monthArr = firstMonthArr.concat(tempMonthArr, lastMonthArr);
                var groupKey = formatMonthChinese(tempYear, tempMonth);
                resArr = resArr.concat(this.getMonthArr(monthArr, groupKey));
                if (tempMonth === 12) {
                    tempMonth = 1;
                    tempYear++;
                } else {
                    tempMonth++;
                }
                // 下月的第一天的星期为当前月最后一天的星期+1
                dayFirst = (dayLast + 1) % 7;
            }
            return resArr;
        }

        /**
         * getMonthArr 将一个月的天数格式化成按周分组，一周一个对象
         * @param monthArr {Array}
         * @param groupKey {String}
         * @returns {Array}
         */

    }, {
        key: 'getMonthArr',
        value: function getMonthArr(monthArr, groupKey) {
            var _this3 = this;

            var resMonthArr = [];
            var tempWeekArr = [];
            monthArr.forEach(function (item, i) {
                var itemDayObj = item;
                if (!itemDayObj.disabled && !!_this3.checkIn) {
                    var itemStr = itemDayObj.date + '/' + itemDayObj.day;
                    var itemDate = new Date(itemStr);
                    var compareIn = compareDate(itemDate, _this3.checkInDate);
                    var compareOut = !!_this3.checkOut && compareDate(itemDate, _this3.checkOutDate);
                    if (!compareIn) {
                        _this3.checkIn = itemDayObj;
                        itemDayObj.isCheckIn = true;
                    }
                    if (compareIn > 0 && compareOut < 0 || (!compareIn || compareOut === 0) && !_this3.allowSingle) {
                        itemDayObj.isCheck = true;
                        _this3.checkRange.push(itemDayObj);
                    }
                    if (compareOut === 0) {
                        _this3.checkOut = itemDayObj;
                        itemDayObj.isCheckOut = true;
                    }
                }

                if (i % 7 === 6) {
                    tempWeekArr.push(itemDayObj);
                    resMonthArr.push(_this3.getWeekObj(tempWeekArr, groupKey));
                    tempWeekArr = [];
                } else {
                    tempWeekArr.push(itemDayObj);
                }
            });
            return resMonthArr.map(function (item, i) {
                return _extends({}, item, { key: item.groupKey + i });
            });
        }

        /**
         * 给每周对象上加isRender标志值, 该周是否更新,性能优化
         * @param weekArr {Array} 一周的数组
         * @param groupKey {String} 这周的groupKey
         * @returns {{week: array, isRender: boolean, groupKey: string}}
         */

    }, {
        key: 'getWeekObj',
        value: function getWeekObj(weekArr, groupKey) {
            var _this4 = this;

            var resObj = {
                week: weekArr,
                isRender: false,
                groupKey: groupKey
            };
            if (!this.checkIn) {
                return resObj;
            }
            weekArr.forEach(function (item) {
                if (item.disabled) {
                    return;
                }
                var itemStr = item.date + '/' + item.day;
                var itemDate = new Date(itemStr);
                var compareIn = compareDate(itemDate, _this4.checkInDate);
                var compareOut = '';
                if (!!_this4.checkOut && _this4.isRender) {
                    compareOut = compareDate(itemDate, _this4.checkOutDate);
                    // 结束
                    if (compareOut <= 0) {
                        _this4.isRender = !!compareOut;
                        resObj.isRender = true;
                    }
                }
                if (compareIn === 0) {
                    resObj.isRender = true;
                    _this4.isRender = true;
                }
            });
            // console.log(this.isRender)
            return resObj;
        }
    }]);

    return CalendarCore;
}(_ComponentCore3.default);

exports.default = CalendarCore;