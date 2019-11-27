define([
    'zcamp/component/form/baseForm/FormFieldPopViewField',
    'zcamp/component/form/attrForm/BaseAttrFormField',
], function (FormFieldPopViewField, BaseAttrFormField) {

    return FormFieldPopViewField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (attr) {
            var me = this;

            var opts = me.formatCommonFieldAttr(attr);
            opts.url = attr.comboUrl;
            me.options = opts;
            FormFieldPopViewField.prototype.initialize.apply(me, opts);
        }
    }));
});
