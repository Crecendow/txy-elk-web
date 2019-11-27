define([
    'hbs!zcamp/component/button/templates/ButtonGroup.html',
    'zcamp/component/button/Button',
    'zcamp/modules/common/ZUtils'
], function (viewTpl, Button, ZUtils) {

    return fish.View.extend({
        //el: false,
        template: viewTpl,

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;

            return opts;
        },

        initialize: function () {
            var me = this,
                opts = me.options;

            if (opts.buttons && opts.buttons.length > 0) {
                var btns = [], btn;
                me.btnMap = {};

                fish.each(opts.buttons, function(buttonOpt) {
                    if (buttonOpt.type === 'dropDownButton') {
                    } else {
                        buttonOpt.btnCls = "btn-default";
                        btn = new Button(buttonOpt);
                        me.btnMap[buttonOpt.name] = btn;
                    }
                    btns.push(btn);
                });

                me.setViews({
                    '.btn-group': btns
                });
            }
        },

        afterRender: function () {
            var me = this;
            ZUtils.on(me.$(".btn"), 'click', me, me.doChangButton);
        },

        doChangButton: function (curBtn) {
            var me = this;

            var selectedBtn = me.$(".btn-select-active");
            selectedBtn.removeClass('btn-select-active btn-primary');
            selectedBtn.addClass('btn-default');

            curBtn.removeClass('btn-default');
            curBtn.addClass("btn-primary btn-select-active");
        },

        disable: function (name) {
            var me = this;

            me._commonCallFunc("disable", name);
        },

        enable: function(name) {
            var me = this;

            me._commonCallFunc("enable", name);
        },

        isEnabled: function(name) {
            var me = this;
            if (name) {
                var btn = me.btnMap[name];
                if (btn) {
                    return btn.isEnabled();
                }
            } else {
                var result = true;
                fish.each(me.btnMap, function (btn, name) {
                    result = result && btn.isEnabled();
                });
                return result;
            }
        },

        hide: function(name) {
            var me = this;

            me._commonCallFunc("hide", name);
        },

        show: function(name) {
            var me = this;

            me._commonCallFunc("show", name);
        },

        isHidden: function(name) {
            var me = this;
            if (name) {
                var btn = me.btnMap[name];
                if (btn) {
                    return btn.isHidden();
                }
            } else {
                var result = true;
                fish.each(me.btnMap, function (btn, name) {
                    result = result && btn.isHidden();
                });
                return result;
            }
        },

        _commonCallFunc: function (funcName, btnName) {
            var me = this;
            if (btnName) {
                var btn = me.btnMap[btnName];
                if (btn) {
                    btn[funcName].call(btn);
                }
            } else {
                fish.each(me.btnMap, function (btn, name) {
                    btn[funcName].call(btn);
                });
            }
        },

        // view被移除时候调用
        cleanup: function () {
            var me = this;
            ZUtils.un(me.$(".btn"), 'click', me.doChangButton);
        }
    });
});