define([
    'zcamp/component/form/baseForm/FormFieldTextField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldTextField, BaseAttrFormField) {

    return FormFieldTextField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (opts) {
            var me = this;

            opts = me.formatCommonFieldAttr(opts);
            me.options = opts;
            FormFieldTextField.prototype.initialize.apply(me, opts);
        }

    }));
});
