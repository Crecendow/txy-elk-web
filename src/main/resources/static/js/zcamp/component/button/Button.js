define([
    'hbs!zcamp/component/button/templates/Button.html'
], function(viewTpl) {
    
    return fish.View.extend({
        el: false,
        template: viewTpl,

        events: {
            'click': 'onClick'
        },

        /**
         var button = new Button({
             data: {
                enabled: true, // 默认启用
                hidden: false, // 默认展示
                isMiddleBtn: false, // 默认大按钮
                isSmallBtn: false, // 默认大按钮
                btnCls: "btn-primary", // 按钮样式
                icon: "fa-plus", // 按钮图标，fontAwosome
                iconcls： "", // 按钮图标，css预定义
                name: "addBtn", // 按钮名称
                text: "新增", // 显示文本
                tag: "tag", // btn-tag-{{tag}} (class)
                modalCancel: false, // 是否弹窗的取消按钮，默认否

                handler: function (handlerArgs) {}, // 单击事件处理函数
                handlerArgs: [a,b], // 事件处理参数
                scope: this // 作用域
            },
            accordionid: fish.getUUID() // 全局唯一ID
        });

         */
        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options,
                btnStyle = "",
                btnStyleArr = [],
                disabled = false,
                btnCls = "btn-primary",
                isLargeBtn = true,
                isSmallBtn = false;

            if (opts.enabled === false) {
                disabled = true;
            }
            
            // 隐藏与否
            if (opts.hidden === true) {
                btnStyleArr.push("display: none;");
            }

            if (btnStyleArr.length > 0) {
                btnStyle = btnStyleArr.join();
            }

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
                iconcls: opts.iconcls,
                btnstyle: btnStyle,
                name: opts.name,
                text: opts.text,
                tag: opts.tag,
                disabled: disabled,
                btnCls: btnCls,
                modalCancel: opts.modalCancel,
                isLargeBtn: isLargeBtn,
                isSmallBtn: isSmallBtn
            }
        },

        disable: function() {
            var me = this;

            me.$el.attr("disabled", true);
        },

        enable: function() {
            var me = this;

            me.$el.removeAttr("disabled");
        },

        isEnabled: function() {
            var me = this;

            return me.$el.attr("disabled") !== "disabled";
        },

        hide: function() {
            var me = this;

            me.$el.hide();
        },

        show: function() {
            var me = this;

            me.$el.show();
        },

        isHidden: function() {
            var me = this;
            
            return me.$el.is(":hidden");
        },

        onClick: function() {
            var me = this,
                opts = me.options;

            if (opts.handler && me.isEnabled()) {
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