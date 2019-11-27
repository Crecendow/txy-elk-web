define([
    'i18n!zcamp/modules/common/i18n/ZUtils.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'frm/plugins/toastr/toastr'
], function (i18n, commonI18n, toastr) {

    /**
     * 工具类
     * Ajax请求通过nginx配置转发
     */

    var ZUtils = {};


    // 提示相关
    ZUtils.Msg = (function() {

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        var loadingOptions = {
            "tapToDismiss": false,
            "closeButton": true,
            "timeOut": "0",
            "extendedTimeOut": "0",
            "beforeShow": function() {
                $(this).attr("style", "background-image: none !important;");
                $(this).prepend("<div class='ball-only-rotate toast-loading-icondiv'><div></div></div>");
            }
        };

        function showLoading(title, content, options) {
            return toastr.info(content, title, $.extend({}, loadingOptions, options));
        }

        function clear($msg) {
            if ($msg) {
                toastr.clear($msg, {force: true});
            }
        }

        function block(targetEl, content) {
            return targetEl.blockUI({message: content});
        }

        function unblock(targetEl) {
            return targetEl.unblockUI();
        }

        function showInfo(title, content) {
            if (arguments.length === 1) {
                return toastr.info(arguments[0], i18n.INFO_TITLE);
            }

            return toastr.info(content, title);
        }

        function showError(title, content) {
            if (arguments.length === 1) {
                return toastr.error(arguments[0], i18n.ERROR_TITLE);
            }

            return toastr.error(content, title);
        }

        function showWarning(title, content) {
            if (arguments.length === 1) {
                return toastr.warning(arguments[0], i18n.WARNING_TITLE);
            }

            return toastr.warning(content, title);
        }

        function showSuccess(title, content) {
            if (arguments.length === 1) {
                return toastr.success(arguments[0], i18n.SUCCESS_TITLE);
            }

            return toastr.success(content, title);
        }

        var msgObj = {
            showLoading: showLoading,
            clear: clear,
            showInfo: showInfo,
            showError: showError,
            showWarning: showWarning,
            showSuccess: showSuccess,
            block: block,
            unblock: unblock
        };

        return msgObj;

    })();

    ZUtils.confirm = function(textOpts, okCallback, cancelCallback) {
        if (typeof textOpts === 'string') {
            textOpts = {
                message:textOpts,
                ok: commonI18n.COMMON_CONFIRM,
                cancel: commonI18n.COMMON_CANCEL
            }
        }
        fish.confirm({
            message: textOpts.message,
            ok: textOpts.ok,
            cancel: textOpts.cancel
        }).result.then(okCallback, cancelCallback);
    };

    ZUtils.fileCount = function(size) {
        if (!size || '' == size) {
            return '0 KB';
        }
        var reg = /([0-9]+\.[0-9]{1,2})|(^[1-9][0-9]*$)/;
        var pre = 1024;
        var val1 = size / pre;
        var val2 = size / (pre * pre);
        var val3 = size / (pre * pre * pre);
        var val4 = size / (pre * pre * pre * pre);
        if (val1 < 1) {
            return size + ' Byte';
        } else if (val1 >= 1 && val1 < pre) {
            return reg.exec(val1)[0] + ' KB';
        } else if (val2 >= 1 && val2 < pre) {
            return reg.exec(val2)[0] + ' MB';
        } else if (val3 >= 1 && val3 < pre) {
            return reg.exec(val3)[0] + ' GB';
        } else {
            return reg.exec(val4)[0] + ' TB';
        }
    };

    ZUtils.timeCount = function (ms) {
        if (!ms || '' == ms || ms < 0) {
            return '00:00';
        }
        var second = Math.round(ms / 1000);
        if (second < 60) {
            return second + "s"
        }
        var minute = Math.floor(second / 60);
        second = second - minute * 60;
        if (minute < 60) {
            return minute + "min " + second + "s"
        }
        var hour = Math.floor(minute / 60);
        minute = minute - hour * 60;
        if (hour < 24) {
            return hour + "hour " + minute + "min " + second + "s"
        }
        var day = Math.floor(hour / 24);
        hour = hour - day * 24;
        return day + "day " + hour + "hour " + minute + "min " + second + "s"
    };


    /**
     * Returns true if the passed value is a string.
     * @param {Object} value The value to test
     * @return {Boolean}
     */
    ZUtils.isString = function(value) {
        return typeof value === 'string';
    };

    ZUtils.listenerHolder = (function() {
        var registerElementList = [];

        var getListenerObj = function(el) {
            if (!el) {
                return null;
            }

            for (var i = 0; i < registerElementList.length; i++) {
                var registerElement = registerElementList[i];
                if (registerElement.el === el) {
                    return registerElement.listenerObj;
                }
            }

            return null;
        };

        var addListenerObj = function(el) {
            if (!el) {
                return null;
            }

            var registerElement = {
                el: el,
                listenerObj: {}
            };

            registerElementList.push(registerElement);

            return registerElement.listenerObj;
        };

        // 判断是否有该监听函数
        var contains = function(el, eventName, func) {
            if (!el) {
                return false;
            }
            if (!eventName) {
                return false;
            }
            if (!func) {
                return false;
            }

            var listenerObj = getListenerObj(el);
            if (!listenerObj) {
                return false;
            }

            var o = listenerObj[eventName];
            if (!o) {
                return false;
            }

            return !!o[func];
        };


        // 添加一个监听函数
        var add = function(el, eventName, func, scope, opts) {
            if (!el) {
                return;
            }
            if (!eventName) {
                return;
            }
            if (!func) {
                return;
            }

            if (contains(el, eventName, func)) {
                return;
            }

            var listenerObj = getListenerObj(el);
            if (!listenerObj) {
                listenerObj = addListenerObj(el);
            }

            var o = listenerObj[eventName];
            if (!o) {
                o = {};
                listenerObj[eventName] = o;
            }

            // 内部作用域嵌套监听函数, 与指定监听函数一一对应
            var nFunc = function() {
                var target = $(this);
                func.call(scope || this, target, opts);
            };

            o[func] = {
                nFunc: nFunc,
                scope: scope,
                opts: opts
            };

            return nFunc;
        };

        // 移除监听函数
        var remove = function(el, eventName, func) {
            if (!el) {
                return null;
            }
            if (!eventName) {
                return null;
            }
            if (!func) {
                return null;
            }

            var listenerObj = getListenerObj(el);
            if (!listenerObj) {
                return null;
            }

            var o = listenerObj[eventName];
            if (!o) {
                return null;
            }

            var funcObj = o[func];
            if (!funcObj) {
                return null;
            }

            return funcObj.nFunc;
        };

        return {
            add: add,
            remove: remove,
            contains: contains
        };
    })();

    ZUtils.addListener = function(el, eventName, scope, func, opts) {
        $(el).each(function() {
            var $el = $(this), nFunc = ZUtils.listenerHolder.add($el[0], eventName, func, scope, opts);
            if (!nFunc) {
                return;
            }
            $el.on(eventName, nFunc);
        });
    };
    ZUtils.on = ZUtils.addListener;

    ZUtils.removeListener = function(el, eventName, func) {
        $(el).each(function() {
            var $el = $(this), nFunc = ZUtils.listenerHolder.remove($el[0], eventName, func);
            if (!nFunc) {
                return;
            }
            $el.off(eventName, nFunc);
        });
    };
    ZUtils.un = ZUtils.removeListener;


    // 处理字符串到指定长度, 多余的添加省略号...
    ZUtils.ellipsisString = function(str, keepLen) {
        if (!str) {
            return str;
        }

        var vLength = 0, c, rStr = new String();

        for (var i = 0; i < str.length; i++) {
            c = str.charAt(i);

            //中文字符的长度经编码之后大于4
            if (escape(c).length > 4) {
                vLength += 2;
            } else {
                vLength ++;
            }

            if (vLength >= keepLen && i < str.length - 1) {
                return rStr.concat("...");
            }
            rStr = rStr.concat(c);
        }

        return str;
    };

    // Datatable Utils
    ZUtils.ellipsisCell = function(cell, cellTitle) {
        if (!cell) return;

        var text = cell.innerText;
        if (cellTitle && text != cellTitle) {
            $(cell).attr('title', cellTitle);
        }
    };

    ZUtils.cookie = {
        setCookie: function(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
        },
        getCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        }
    };

    ZUtils.format = function () {
        if (arguments.length == 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    };//$.validator.format;

    /**
     * 同步遍历数组, 需要在循环体通过context.next()来手动进入下一个元素
     * iterFunc 的参数依次是 index, elem, list, context
     */
    ZUtils.syncEach = (function() {

        function SyncEachContext(list, iterFunc, scope) {
            this.list = list;
            this.iterFunc = iterFunc;
            this.index = -1;
            this.iterFuncScope = scope;
        }

        SyncEachContext.prototype.before = function(beforeFunc, scope) {
            this.beforeFunc = beforeFunc;
            this.beforeFuncScope = scope;

            return this;
        };

        SyncEachContext.prototype.next = function () {
            if (this.index === -1 && this.beforeFunc) {
                this.beforeFunc.call(this.beforeFuncScope || this.iterFuncScope || this, this);
            }

            this.index ++;

            var elem = this.list[this.index];

            if (!elem) {
                if (this.doneFunc) {
                    this.doneFunc.call(this.doneFuncScope || this.iterFuncScope || this, this);
                }
                return;
            }

            this.iterFunc.call(this.iterFuncScope || this, this.index, elem, this.list, this);
        };

        SyncEachContext.prototype.done = function(doneFunc, scope) {
            this.doneFunc = doneFunc;
            this.doneFuncScope = scope;

            return this;
        };

        return function(list, iterFunc, scope) {
            return new SyncEachContext(list, iterFunc, scope);
        }
    })();

    ZUtils.formatResourceUrl = function(url) {
        return "zcamp/" + url;
    };

    /**
     * 用来为函数绑定作用域this, 生成代理函数
     */

    ZUtils.bind = function(func, scope, args) {
        return function() {
            var callArgs = args || arguments;
            if (args) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }

            return func.apply(scope, callArgs);
        };
    }


    ZUtils.getCodeMirrorMode = function (suffix) {
        if (suffix === 'py') {
            return 'python';
        }
        if (suffix === 'yml') {
            return 'yaml';
        }
        if (suffix === 'md') {
            return 'markdown';
        }
        if (!suffix || suffix === 'txt') {
            return null;
        }
        if (suffix === 'js' || suffix === 'json') {
            return 'javascript';
        }
        if (suffix === 'sh') {
            return 'shell';
        }
        return suffix;
    }

    /**
     * 简单遍历树结构
     * @param nodeList 树节点列表
     * @param childNodeListName 树节点的子节点属性名称
     */
    ZUtils.cascade = function(nodeList, childNodeListName, fn, scope) {
        if (!nodeList || !nodeList.length) {
            return;
        }

        if (!childNodeListName) {
            childNodeListName = 'children';
        }

        $.each(nodeList, function(index, node) {
            fn && fn.call(scope || this, node);
            node[childNodeListName] && ZUtils.cascade(node[childNodeListName], childNodeListName, fn, scope);
        });
    };

    ZUtils.getTabHeight = function () {
        var totalHeight = $("#divContent").height(),
            navHeight = $(".ui-tabs-nav").outerHeight();

        return totalHeight - navHeight  - 28;
    };

    ZUtils.Class = {};

    /**
     * 类型构造器, 支持多继承.
     * 
     * 这个方法用来定义基于prototype的js类, 使用方式如下:
     * (code)
     *     var MyClass = ZUtils.Class.create(prototype);
     * (end)
     *
     * 支持多继承, 使用方式如下:
     * (code)
     *     var MyClass = ZUtils.Class.create(Class1, Class2, prototype);
     * (end)
     * 注意: 多继承下只有Class1是父类
     *
     */
    ZUtils.Class.create = function() {
        var len = arguments.length;
        var P = arguments[0];
        var F = arguments[len - 1];

        var C = typeof F.initialize == "function" ?
            F.initialize :
            function () { P.prototype.initialize.apply(this, arguments); };

        if (len > 1) {
            var newArgs = [C, P].concat(Array.prototype.slice.call(arguments).slice(1, len - 1), F);
            ZUtils.Class.inherit.apply(null, newArgs);
        } else {
            C.prototype = F;
        }
        return C;
    };

    /**
     * 实现类继承
     * 
     * Parameters:
     * C - {Object} 子类
     * P - {Object} 父类
     * 
     * 如果参数超过2个, 后面的所有参数的属性都会被复制到C上
     */
    ZUtils.Class.inherit = function(C, P) {
        var F = function () { };
        F.prototype = P.prototype;
        C.prototype = new F;
        var i, l, o;
        for (i = 2, l = arguments.length; i < l; i++) {
            o = arguments[i];
            if (typeof o === "function") {
                o = o.prototype;
            }
            fish.extend(C.prototype, o);
        }
    };

    return ZUtils;
});
