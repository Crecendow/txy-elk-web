define([
    'hbs!zcamp/component/button/templates/DropDownButton.html',
    'zcamp/component/button/MenuButton',
    'zcamp/component/button/Separator'
], function(viewTpl, MenuButton, Separator) {

    return fish.View.extend({
        el: false,
        template: viewTpl,

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options,
                btnCls = "btn-primary",
                isLargeBtn = true,
                isSmallBtn = false;


            if ("middle" == opts.buttonSize) {
                isLargeBtn = false;
                btnCls = "btn-default";
            }

            if ("small" == opts.buttonSize) {
                isLargeBtn = false;
                isSmallBtn = true;
                btnCls = "btn-default";
            }

            if (opts.btnCls) {
                btnCls = opts.btnCls;
            }

            return {
                icon: opts.icon,
                name: opts.name,
                text: opts.text,
                btnCls: btnCls,
                isLargeBtn: isLargeBtn,
                isSmallBtn: isSmallBtn
            }
        },

        // 初始化参数, 在这里处理渲染之前的操作
        initialize: function() {
            var me = this,
                opts = me.options;

            if (opts.buttons && opts.buttons.length > 0) {
                var btns = [], btn;

                fish.each(opts.buttons, function(buttonOpt) {
                    buttonOpt.handlerArgs = opts.handlerArgs;
                    if (buttonOpt === '-') {
                        btn = new Separator();
                    } else {
                        btn = new MenuButton(buttonOpt);
                    }
                    btns.push(btn);
                });

                me.setViews({
                    '.dropdown-menu': btns
                });
            }
        },

        //这里用来进行dom操作
        afterRender: function () {
            var me = this;

        },

        onClick: function() {
            var me = this,
                opts = me.options;

            if (opts.handler) {
                if (opts.handlerArgs) {
                    opts.handler.apply(opts.scope || me, opts.handlerArgs);
                } else {
                    opts.handler.call(opts.scope || me);
                }
            }
        },

        // view被移除时候调用
        cleanup: function() {}
    });
});