define([
    'zcamp/component/form/baseForm/FormFieldTextArea',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldTextArea, BaseAttrFormField) {

    return FormFieldTextArea.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (opts) {
            var me = this;

            opts = me.formatCommonFieldAttr(opts);
            me.options = opts;
            FormFieldTextArea.prototype.initialize.apply(me, opts);
        }

    }));
});
