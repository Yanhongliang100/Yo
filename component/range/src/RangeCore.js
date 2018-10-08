'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RangeCore = function () {
    function RangeCore(step) {
        var trackLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 292;
        var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var range = arguments[3];
        var value = arguments[4];
        var round = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.25;
        var directionSensitivity = arguments[6];

        _classCallCheck(this, RangeCore);

        this.BothMoved = false;
        this.bothMovingDirection = 0;
        this.separated = false;

        // touch 方向灵敏度
        this.directionSensitivity = 6;
        this.exportedIndex = {};
        this.exportedValue = {};
        this.refresh(step, trackLength, single, range, value, round, directionSensitivity);
    }

    _createClass(RangeCore, [{
        key: 'validateProps',
        value: function validateProps(props) {
            var isSingle = props.isSingle,
                max = props.max,
                min = props.min,
                round = props.round,
                step = props.step,
                value = props.value,
                range = [min, max];

            if (range[0] > range[1] || range.length < 2) {
                throw new Error('yo-range:range属性必须有两个元素,其中第二个元素(上限)的值必须大于第一个(下限)');
            } else if (step !== undefined && step <= 0) {
                throw new Error('yo-range:step必须为正数');
            } else if (value[0] < range[0]) {
                throw new Error('yo-range:左侧滑块的值不能小于range的下限');
            } else if (round >= 1 || round <= 0) {
                throw new Error('yo-range:round必须为0-1之间的数字');
            } else if (step !== undefined) {
                if (step > Math.abs(range[0] - range[1])) {
                    throw new Error('yo-range:step不能大于可滑动范围');
                } else if ((range[1] - range[0]) % step) {
                    throw new Error('yo-range:(max - min)必须能被step整除');
                } else if (isSingle && (value - min) % step) {
                    throw new Error('yo-range:(value - min)在step不为0时，必须能被step整除');
                }
            }
            if (!isSingle) {
                if (value[0] > value[1] || value.length < 2) {
                    throw new Error('yo-range:双滑块模式下,value属性必须有两个元素,其中第二个元素(右侧滑块)的值必须大于第一个(左侧滑块)');
                } else if (value[1] > range[1]) {
                    throw new Error('yo-range:右侧滑块的value不能大于range的上限');
                } else if (step !== undefined) {
                    if ((value[0] - min) % step || (value[1] - min) % step) {
                        throw new Error('yo-range:(value[i] - min)必须能被step整除');
                    }
                }
            }
        }
    }, {
        key: 'refresh',
        value: function refresh(step) {
            var trackLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 292;
            var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var range = arguments[3];
            var value = arguments[4];
            var round = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.25;
            var directionSensitivity = arguments[6];

            this.decimalLenOfValue = this.maxDecimalLenOfList([step]);
            var valueRange = range[1] - range[0];
            this.stepValue = step;
            this.directionSensitivity = directionSensitivity;
            if (step === undefined) {
                this.stepValue = valueRange / trackLength;
            }
            // step 为 0 表示不设置步长 ，即为translateX步长为1px（this.step = 1）的特殊情况，
            // 此时对应的Value值步长为 valueRange / trackLength
            this.step = trackLength / (valueRange / this.stepValue);
            this.maxEndTransX = trackLength;
            this.rateXtoValue = valueRange / this.maxEndTransX;
            this.range = range;
            this.round = round;
            this.single = single;

            // 如果输入的不是停驻点的数，则往最近的点靠
            this.btnLeft = {
                maxTransX: single ? this.maxEndTransX : this.maxEndTransX - this.step,
                minTransX: 0
            };
            this.btnRight = {
                maxTransX: this.maxEndTransX,
                minTransX: single ? 0 : this.step
            };
            this.syncFromState(value);
        }
    }, {
        key: 'getTransXList',
        value: function getTransXList() {
            return [this.btnLeft.translateX, this.btnRight.translateX];
        }
    }, {
        key: 'keepMaxDecimalNum',
        value: function keepMaxDecimalNum(num) {
            var decimalNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.decimalLenOfValue;

            return parseFloat(num.toFixed(decimalNum), 10);
        }
    }, {
        key: 'maxDecimalLenOfList',
        value: function maxDecimalLenOfList(numList) {
            return numList.reduce(function (accMax, num) {
                var decimal = String(num).split('.')[1],
                    len = decimal && decimal.length;
                return Math.max(len || 0, accMax);
            }, 0);
        }
    }, {
        key: 'mapValueToX',
        value: function mapValueToX(value) {
            return Math.round((value - this.range[0]) / this.rateXtoValue);
        }
    }, {
        key: 'mapXtoValue',
        value: function mapXtoValue(transX) {
            return this.keepMaxDecimalNum(this.rateXtoValue * transX + this.range[0]);
        }
    }, {
        key: '_cutNum',
        value: function _cutNum(num, maxValue, minValue) {
            return Math.min(maxValue, Math.max(minValue, num));
        }
    }, {
        key: '_roundIndex',
        value: function _roundIndex(index, direction) {
            var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.round;

            return direction > 0 ? Math.ceil(index - error) : Math.floor(index + error);
        }
    }, {
        key: '_trimTranslateX',
        value: function _trimTranslateX(direction) {
            var which = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'btnLeft';

            if (this.step !== 0) {
                var slider = this[which],
                    translateX = this._roundIndex(slider.translateX / this.step, direction) * this.step;
                slider.translateX = this._cutNum(translateX, slider.maxTransX, slider.minTransX);
            }
        }
    }, {
        key: 'exportData',
        value: function exportData(which, direction) {
            // 计算出需要导出的数据 index, value
            this.exportedIndex[which] = this._roundIndex(this[which].translateX / this.step, direction);
            this.exportedValue[which] = this.mapXtoValue(this[which].translateX);
        }
    }, {
        key: '_dealBothMoving',
        value: function _dealBothMoving(which, gap, moveLength, direction) {
            var theOtherIndex = which === 'btnLeft' ? 'btnRight' : 'btnLeft',
                slider = this[theOtherIndex];

            // 判断是否小于最小间隔 一个 step
            if (gap < this.step) {
                // 标记进入 同时移动 状态
                this.bothMoved = true;

                // 标记是否非同时移动后分开了
                this.separated = false;

                // 将 差值 补给 另一个滑块
                var extraTransX = this.step - gap;
                slider.translateX += moveLength < 0 ? -extraTransX : extraTransX;

                this.exportData(theOtherIndex, direction);
                this.bothMovingDirection = direction;
            } else if (this.bothMoved === true) {
                // 当一起移动结束后，记录下 不再滑动的 那个滑块的方向
                if (!this.separated) {
                    slider.direction = this.bothMovingDirection;
                    this.separated = true;
                }
            }
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(startX) {
            var which = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'btnLeft';

            var slider = this[which];
            this.bothMoved = false;
            slider.movingX = startX;
            slider.direction = 0;
            slider.startX = startX;
            slider.basic = slider.translateX;
            return this;
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(movingX) {
            var which = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'btnLeft';

            var slider = this[which];
            var diff = movingX - slider.movingX;
            if (Math.abs(diff) > this.directionSensitivity) {
                slider.direction = movingX - slider.movingX;
                slider.movingX = movingX;
            }
            slider.moveLength = movingX - slider.startX;
            var translateX = slider.basic + slider.moveLength;
            slider.translateX = this._cutNum(translateX, slider.maxTransX, slider.minTransX);

            var gapSection = this.btnRight.translateX - this.btnLeft.translateX;
            if (!this.single) {
                this._dealBothMoving(which, gapSection, slider.moveLength, slider.direction);
            }
            this.exportData(which, slider.direction);
            return this;
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd() {
            var _this = this;

            var which = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'btnLeft';

            // 如果存在 A 滑块方向为 0 或 undefined ，则将 A 滑块方向默认值设为 另一个滑块的方向。
            var direction = this.btnLeft.direction || this.btnRight.direction,
                sliderList = this.bothMoved ? ['btnLeft', 'btnRight'] : [which];

            sliderList.forEach(function (index) {
                _this._trimTranslateX(_this[index].direction || direction, index);
                _this.exportedIndex[index] = Math.round(_this[index].translateX / _this.step);
                _this.exportedValue[index] = _this.mapXtoValue(_this[index].translateX);
            });
            return this.reInit();
        }
    }, {
        key: 'syncFromState',
        value: function syncFromState(value) {
            var _this2 = this;

            ['btnLeft', 'btnRight'].forEach(function (which, index) {
                if (value[index] !== undefined) {
                    _this2[which].translateX = _this2.mapValueToX(value[index]);
                    _this2.exportedIndex[which] = Math.round(_this2[which].translateX / _this2.step);
                    _this2.exportedValue[which] = value[index];
                }
            });
        }
    }, {
        key: 'reInit',
        value: function reInit() {
            this.bothMoved = false;
            this.separated = false;
            this.bothMovingDirection = 0;
            this.btnLeft.direction = 0;
            this.btnRight.direction = 0;
            return this;
        }
    }]);

    return RangeCore;
}();

exports.default = RangeCore;