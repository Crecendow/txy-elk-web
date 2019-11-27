define([
    'zcamp/component/panel/PortletPanel'
], function(PortletPanel) {

    return PortletPanel.extend({
        //el: false,

        // 用于模板中进行替换的数据对象
        /**
         * 新增属性：
         * noPanel: 减少外边距，通过对象属性设置
         **/
        baseSerialize: function() {
            var me = this,
                opts = me.options;
            opts.noHeader = true;
            opts.simplePanel = true;

            if (me.noPanel) {
                opts.noPanel = me.noPanel;
            }

            var data = PortletPanel.prototype.baseSerialize.apply(me);

            return fish.extend({}, data, opts);
        }
    });
});