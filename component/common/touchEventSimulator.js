'use strict';

/**
 * 使用鼠标事件模拟移动端touch事件
 * 稍有不足的地方是鼠标移出container以后无法继续触发touchmove,因为不会触发mousemove,无法模拟
 * 折中的办法是鼠标移出container范围后(监听document.body的mouseleave)触发touchcancel
 * @param container 目标容器dom,默认为document.body
 */
function touchEventSimulator() {
    function isMobile() {
        return navigator.userAgent.toLowerCase().search(/iphone|android|mobile/) !== -1;
    }

    function createTouchEvent(evt, name) {
        var screenX = evt.screenX,
            screenY = evt.screenY,
            pageX = evt.pageX,
            pageY = evt.pageY,
            clientX = evt.clientX,
            clientY = evt.clientY;

        var touchEvent = document.createEvent('UIEvent');

        touchEvent.initEvent(name, true, true);
        touchEvent.touches = touchEvent.changedTouches = [{ screenX: screenX, screenY: screenY, pageX: pageX, pageY: pageY, clientX: clientX, clientY: clientY }];

        return touchEvent;
    }

    var hasTrigger = false,
        target = null;

    if (!isMobile()) {
        document.body.addEventListener('mousedown', function (evt) {
            // evt.preventDefault();
            if (evt.which === 1) {
                target = evt.target;
                target.dispatchEvent(createTouchEvent(evt, 'touchstart'));
                hasTrigger = true;
            }
        });

        document.body.addEventListener('mousemove', function (evt) {
            // mousemove可能会触发文本框聚焦
            evt.preventDefault();
            if (hasTrigger) {
                target.dispatchEvent(createTouchEvent(evt, 'touchmove'));
            }
        });

        document.body.addEventListener('mouseup', function (evt) {
            evt.preventDefault();
            if (hasTrigger && target) {
                target.dispatchEvent(createTouchEvent(evt, 'touchend'));
                hasTrigger = false;
                target = null;
            }
        });

        document.body.addEventListener('mouseleave', function (evt) {
            evt.preventDefault();
            hasTrigger = false;
            if (target) {
                target.dispatchEvent(createTouchEvent(evt, 'touchend'));
                target = null;
            }
        });

        var nodes = document.querySelectorAll('a,img'),
            len = nodes.length;
        for (var i = 0; i < len; i++) {
            nodes[i].ondragstart = function (evt) {
                evt.preventDefault();
                return false;
            };
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    touchEventSimulator();
});