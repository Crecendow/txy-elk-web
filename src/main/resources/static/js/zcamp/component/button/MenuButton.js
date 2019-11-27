define([
    'hbs!zcamp/component/button/templates/MenuButton.html'
], function(viewTpl) {
    
    return fish.View.extend({
        el: false,
        template: viewTpl,

        events: {
            'click': 'onClick'
        },

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;;

            return {
                icon: opts.icon,
                name: opts.name,
                text: opts.text
            }
        },

        // 初始化参数, 在这里处理渲染之前的操作
        initialize: function() {
            var me = this;

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