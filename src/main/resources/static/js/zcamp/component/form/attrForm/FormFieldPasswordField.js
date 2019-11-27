define([
    'zcamp/component/form/baseForm/FormFieldPasswordField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldPasswordField, BaseAttrFormField) {

    return FormFieldPasswordField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (opts) {
            var me = this;

            opts = me.formatCommonFieldAttr(opts);
            me.options = opts;
            FormFieldPasswordField.prototype.initialize.apply(me, opts);
        }

    }));
});
